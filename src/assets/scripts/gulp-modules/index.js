@@include('./libs.js');

(function ($) {

	(function() {

		$('.js-header__phone').click(e => {
			e.preventDefault()
			e.stopPropagation()
	
			$('.header__phone-mobile').addClass('header__phone-mobile--show')
		})

		document.addEventListener('click', e => {
			console.log(e.target)
			if( !e.target.closest('.phone__btn') || 
				!e.target.closest('.header__phone-mobile') ||
				!e.target.closest('.js-header__phone')
			) {
				$('.header__phone-mobile').removeClass('header__phone-mobile--show')
			}
		})

		$('.js-burger-btn').click(() => {
			$('.menu').css('display', 'flex')
			setTimeout(() => {
				$('.menu__left').addClass('menu--animate')
				$('.menu__right').addClass('menu--animate')

				setTimeout(() => {
					$('.menu-decor1').css('display', 'block')
					$('.menu__right-top').addClass('show-animate')
					$('.navigation').addClass('show-animate')
				}, 600)
			}, 50) 
		  })
		
		  $('.js-menu__right-close').click(() => {
			setTimeout(() => {
				$('.menu__left').removeClass('menu--animate')
				$('.menu__right').removeClass('menu--animate')

				setTimeout(() => {
					$('.menu-decor1').css('display', 'none')
					$('.menu__right-top').removeClass('show-animate')
					$('.navigation').removeClass('show-animate')
					$('.menu').css('display', 'none')
				}, 600)
			}, 50) 
		  })
	})()

	function mask(inputName, mask, evt) {
		try {
			var text = document.querySelector(inputName);
			var value = text.value;

			// If user pressed DEL or BACK SPACE, clean the valu
			try {
				var e = evt.which ? evt.which : event.keyCode;
				if (e == 46 || e == 8) {
					return;
				}
			} catch (e1) {}

			var literalPattern = /[0\*]/;
			var numberPattern = /[0-9]/;
			var newValue = "";

			for (var vId = 0, mId = 0; mId < mask.length;) {
				if (mId >= value.length) break;

				// Number expected but got a different value, store only the valid portion
				if (mask[mId] == "0" && value[vId].match(numberPattern) == null) {
					break;
				}

				// Found a literal
				while (mask[mId].match(literalPattern) == null) {
					if (value[vId] == mask[mId]) break;

					newValue += mask[mId++];
				}

				newValue += value[vId++];
				mId++;
			}
			text.value = newValue;
		} catch (e) {}
	}

	function checkEmail(str) {
		const re = /\S+@\S+\.\S+/;
		return re.test(str);
	}

	function addIndicateWarnForNode(node, classes, isAdded = true) {
		if (isAdded) {
			$(node).closest(".field").addClass(classes);
			return;
		}

		$(node).closest(".field").removeClass(classes);
	}

	function removeFormTextWarn(input) {
		input.parent().find('.field__error-msg').remove()
	}

	function removeAllFormTextWarn(inputs) {
		inputs.each(function () {
			$(this).parent().find('.field__error-msg').remove()
		})
	}

	function removeNodeByDelay(node, delay) {
		setTimeout(() => {
			node.remove();
		}, delay);
	}

	function validateForm(inputs) {
		let isValid = true;
		inputs.each(function() {
			$(this).on("input", (e) => {

				if (
					$(e.target).attr("name") === "email" &&
					!checkEmail($(e.target).val())
				) {
					removeFormTextWarn($(this));
					$(this)
						.parent()
						.append(
							`<div class="field__error-msg">не корректний email</div>`
						);
					addIndicateWarnForNode($(this), "field--error", true);
					isValid = false;
					return;
				}

				if (
					$(e.target).attr("name") === "phone" &&
					$(e.target).val().length < 12
				) {
					removeFormTextWarn($(this));
					$(this)
						.parent()
						.append(
							`<div class="field__error-msg">Не корретний телефон</div>`
						);
					addIndicateWarnForNode($(this), "field--error", true);
					isValid = false;
					return;
				}

				if ($(e.target).val().replace(/\s+/g, "")) {
					removeFormTextWarn($(this));
					addIndicateWarnForNode($(this), "field--error", false);
					isValid = false;
					return;
				} else {
					removeFormTextWarn($(this));
					$(this)
						.parent()
						.append(
							`<div class="field__error-msg">${msgWarnObj[language].warn}</div>`
						);
					addIndicateWarnForNode($(this), "field--error", true);
					isValid = false;
					return;
				}
			});

			if (!$(this).val().replace(/\s+/g, "") && $(this)[0].type !== 'hidden') {
				removeFormTextWarn($(this));
				$(this)
					.parent()
					.append(
						`<div class="field__error-msg">це поле обов'язкове</div>`
					);
				addIndicateWarnForNode($(this), "field--error", true);
				isValid = false;
			}
		});

		return isValid;
	}

	try {
		const phones = document.querySelectorAll('[name="phone"]');
		phones.forEach(phone => {
			phone.addEventListener("keyup", (e) => {
				mask('[name="phone"]', "+000(00)000-00-00", e);
			});
		})
	} catch (e) {}

	try {
		$(document).on("click", ".submit__form", (e) => {
			let hasValue = true;
			const $form = $(e.target.closest("[data-form]"));
			e.preventDefault();
			const inputs = $form
				.find($("[name]"))
				.not(".g-recaptcha-response")
				.not("iframe");

			const isValid = validateForm(inputs);

			if (isValid) {
				sendAjaxForm('static/mail.php', $form)
			}
		});
	} catch(e) {}

	function sendAjaxForm(url, selectorForm) {

		const status = {
			sucess: "Дякую за заявку ми з вами зв'яжемося найближчим часом",
			error: 'Помилка на сервері спробуйте ще раз'
		}

		$.ajax({
			url:     url, //url страницы (action_ajax_form.php)
			type:     "POST", //метод отправки
			dataType: "html", //формат данных
			data: $(selectorForm).serialize(),  // Сеарилизуем объект
			success: function(response) { //Данные отправлены успешно
				$(selectorForm).append(`<div class="form__status">${status.sucess}</div>`)
				const msg = $(selectorForm).find('.form__status')
				removeNodeByDelay(msg, 5000)
				$(selectorForm)[0].reset()
			},
			error: function(response) { // Данные не отправлены
				$(selectorForm).append(`<div class="form__status">${status.error}</div>`);
				const msg = $(selectorForm).find('.form__status')

				removeNodeByDelay(msg, 5000)
				$(selectorForm)[0].reset()
			}
		 });
	}

	(function() {
		const sectionBalanceTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '.balance__content',
				start: '+=200',
				scroller: ".js-scroll-container",
			}
		})
		
		sectionBalanceTimeline.from('.balance__content', {
			duration: 1,
			delay: 0.1,
			opacity: 0,
			translateY: '40'
		})
	})()

	$('.overlay').hide()

	try {
		$('.js-callback-form').on('click', (e) => {
			$('.overlay').show()
			$('.callback-form__popup').addClass('callback-form__popup--show')
		})

		$('.js-callback-form__close').on('click', (e) => {
			e.stopPropagation()
			$('.callback-form').removeClass('callback-form__popup--show')

			setTimeout(() => $('.overlay').hide(), 700)
		})
	} catch(e) {}

	function createGalleryTemplate(imgs) {
		document.querySelectorAll('.gallery__preview').forEach(item => item.remove())

		return `
		<div class="gallery__preview">
		<div class="container">
		  <div class="gallery__preview-close">
			<button class="gallery__preview-btn btn-round btn-round--white" type="button"></button>
			<div class="gallery__preview-close-text">Назад</div>
		  </div>
		  <div class="gallery__controls gallery__preview-controls">
			<div class="gallery__controls-wrap">
			  <button class="gallery__controls-btn-left gallery__preview-left gallery__controls-btn" type="button"><span class="gallery__current">01 /</span><span class="gallery__total">14</span></button>
			</div>
			<div class="gallery__controls-wrap gallery__controls-wrap--right">
			  <button class="gallery__controls-btn-right gallery__controls-btn-right gallery__controls-btn" type="button"><span class="gallery__current">01 /</span><span class="gallery__total">14</span></button>
			</div>
		  </div>		  	
		</div>
		<div class="gallery__preview-wrap gallery__wrap">
		  <div class="gallery__preview-item"><img src="./assets/images/progress-img.jpg" title="foto" alt="foto"/>
		  </div>
		  <div class="gallery__preview-item"><img src="./assets/images/progress-img.jpg" title="foto" alt="foto"/>
		  </div>
		  <div class="gallery__preview-item"><img src="./assets/images/progress-img.jpg" title="foto" alt="foto"/>
		  </div>
		  <div class="gallery__preview-item"><img src="./assets/images/progress-img.jpg" title="foto" alt="foto"/>
		  </div>
		</div>
	  </div>
		`
	}

	function changeHeaderStyles(change) {
		try {
			if(change) {
				$('.header').removeClass('header--dark')
				const img = $('.header .logo img')
	
				img.attr('src', 'assets/images/logo-white.svg')
				$('.phone__link').removeClass('phone__link--purple')
			} else {
				$('.header').addClass('header--dark')
				const img = $('.header .logo img')
	
				img.attr('src', 'assets/images/logo-white.svg')
				$('.phone__link').addClass('phone__link--purple')
			}
		} catch(e) {}
	}

	try {
		$('.slider__item--progress').each(function() {
			$(this).on('click', function() {
				const item = createGalleryTemplate()
				document.querySelector('.page__inner').insertAdjacentHTML('afterbegin', item)
				$('.slider-control').css('z-index', 3)
				initSlideByClickItem('.gallery__preview-wrap')
				$('.galley__preview').show()
				changeHeaderStyles(true)

				try {
					$('.gallery__preview-content-show').show()
				} catch(e) {}


				$('.gallery__preview-close').click(() => {
					$('.slider-control').css('z-index', 7)
					$('.gallery__preview').remove()
					
					changeHeaderStyles(false)
					const locoScroll = new LocomotiveScroll({
						el: document.querySelector(".js-scroll-container"),
						smooth: true,
						smoothMobile: false,
						inertia: 1.1
					  });

					try {
						$('.gallery__preview-content-show').hide()
					} catch(e) {}
				})
			})
		})
	} catch(e) {}

	function initSlideByClickItem(slider, prev, next) {
		$(slider).on('init afterChange', (_, slick, currentSlide = 0) => {
			$('.gallery__controls-btn .gallery__current').text(` 0${currentSlide + 1} / `)
			$('.gallery__controls-btn .gallery__total').text(` 0${slick.$slides.length} `)
		})
	
		const coord = document.documentElement.clientWidth / 2
		let isFirst = true
		let flag 
	
		document.addEventListener('mouseenter', (e) => {
			if(isFirst) {
				flag = e.pageX < coord ? true : false
				isFirst = false
			}
		})
	
		document.addEventListener('mousemove', (e) => {
			if(e.pageX < coord) {
				if(flag) {
					$('.gallery__controls-btn').removeClass('gallery__controls-btn--show')
					$('.gallery__controls-btn-left').addClass('gallery__controls-btn--show')
					flag = false
				}
			} else {
				if(!flag) {
					$('.gallery__controls-btn').removeClass('gallery__controls-btn--show')
					$('.gallery__controls-btn-right').addClass('gallery__controls-btn--show')
					flag = true
				}
			}
		})
	
		$(slider).slick({
			arrows: false,
		})
	
		$('.gallery__controls-btn-left').click(() => {
			$('.gallery__wrap').slick('slickPrev')
		})
	
		$('.gallery__controls-btn-right').click(() => {
			$('.gallery__wrap').slick('slickNext')
		})
	}

	$('.navigation__inner-item--dropdown').click(function() {
		$(this).find('.navigation__inner-link').toggleClass('.navigation__inner-link--active')
		$(this).find('.navigation__inner-dropdown').slideToggle()
	})


	  // adaptive

	  window.addEventListener('resize', () => {
		if(document.documentElement.clientWidth <= 480) {
		  $('.header__right').prepend($('.intro__phone'))
		}
	  })

	  if(document.documentElement.clientWidth <= 770 && $(document.body).attr('id') !== 'slider-page') {
		  $('.header img').attr('src', './assets/images/logo-dark.svg')
		  $('.header').addClass('header--bg').addClass('header--dark')
	  }
	
	  if(document.documentElement.clientWidth <= 480) {
		$('.header__language')[0].insertAdjacentElement('afterend', $('.header__phone')[0])
	  }

})(jQuery);