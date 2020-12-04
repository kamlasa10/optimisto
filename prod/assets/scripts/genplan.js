const items = Array.from(document.querySelectorAll('[data-plan-item]'))
let prevValue = ''
let flag = true



$('.genplan').on('mouseover', (e) => {

    if(e.target.tagName.toLowerCase() === 'image') {
        $('[data-plan="run"]').css('opacity', 0)
        items.forEach(item => item.classList.remove('genplan__item--active'))

    }

    if(e.target.dataset.plan) {
        const value = e.target.dataset.plan

            if(value === 'run') {
                $('[data-plan="run"]').css('opacity', 1)
            }

            items.forEach(item => item.classList.remove('genplan__item--active'))

            const item = items.find(item => item.dataset.planItem === value)

            item.classList.add('genplan__item--active')
            flag = true

            prevValue = value  
    } else {
        const item = items.find(item => item.dataset.planItem === value)
        $('[data-plan="run"]').css('opacity', 0)
        item.classList.remove('genplan__item--active')
    }
})