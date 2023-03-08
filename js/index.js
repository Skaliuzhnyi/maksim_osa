$(document).on('scroll', function () {
  if ($(document).scrollTop() > 0) {
    $('.header, .header__inner').addClass('fixed');
    $('.header__nav').addClass('hiden');
    $('.header__nav').removeClass('active');
  } else {
    $('.header, .header__inner').removeClass('fixed');
    $('.header__nav').removeClass('hiden');
  }
});

$('.burger').on('click', function () {
  $('.header').toggleClass('active');
  $('body').toggleClass('lock');
});

$('.header__nav-link, .social__link, .header__menu-inner').on(
  'click',
  function () {
    $('.header').removeClass('active');
    $('.header__nav').removeClass('active');
    $('body').removeClass('lock');
  }
);

function subMenuToShow() {
  const menuItemsWithChildren = Array.from(
    document.querySelectorAll('.transfer__list > .transfer__item-has-children')
  );

  const iconPlus = '<span class="transfer__item-plus"></span>';
  const iconCoppy =
    '<button class="coppy__btn" type="button"><svg width = "16" height = "16" viewBox = "0 0 16 16" fill = "none" xmlns = "http://www.w3.org/2000/svg"><path fill-rule = "evenodd" clip-rule = "evenodd" d = "M0.8 12.8L0.893297 12.7946C1.26056 12.752 1.55196 12.4606 1.59462 12.0933L1.6 12V1.6H12L12.0933 1.59462C12.4912 1.54841 12.8 1.21027 12.8 0.8C12.8 0.389731 12.4912 0.0515943 12.0933 0.00538219L12 0H0.8L0.706703 0.00538219C0.339438 0.0480395 0.0480395 0.339438 0.00538219 0.706703L0 0.8V12L0.00538219 12.0933C0.0480395 12.4606 0.339438 12.752 0.706703 12.7946L0.8 12.8ZM15.2 16L15.2933 15.9946C15.6606 15.952 15.952 15.6606 15.9946 15.2933L16 15.2V4L15.9946 3.9067C15.9555 3.57004 15.7074 3.29713 15.3834 3.22113L15.2933 3.20538L15.2 3.2H4L3.9067 3.20538C3.53944 3.24804 3.24804 3.53944 3.20538 3.9067L3.2 4V15.2L3.20538 15.2933C3.24448 15.63 3.4926 15.9029 3.81657 15.9789L3.9067 15.9946L4 16H15.2ZM4.8 4.8V14.4H14.4V4.8H4.8Z"/></svg></button>';

  for (let menuItem of menuItemsWithChildren) {
    menuItem.querySelector('h4').insertAdjacentHTML('beforebegin', iconPlus);
    menuItem
      .querySelector('.transfer__item-coppy')
      .insertAdjacentHTML('beforeend', iconCoppy);
  }

  const menu = document.querySelector('.transfer__list');

  let openedClass = 'opened';

  if (menu) {
    menu.addEventListener('click', (event) => {
      const target = event.target;
      $(target).addClass('active');
      const submenuIcon = target.classList.contains('active');

      if (!submenuIcon) return;

      event.preventDefault();

      const currentParent = target.closest('.transfer__item-has-children');
      const isOpened = currentParent.classList.contains(openedClass);
      const coppyBtn = target.closest('button');

      if (coppyBtn && isOpened) {
        return;
      } else {
        if (!isOpened) {
          for (let item of document.querySelectorAll(
            '.transfer__item-has-children'
          )) {
            if (item.classList.contains(openedClass))
              item.classList.remove(openedClass);
            $(item).children('.transfer__item-content').slideUp(500);
          }
          $(currentParent).children('.transfer__item-content').slideDown(500);
          currentParent.classList.add(openedClass);
        } else {
          $(currentParent).children('.transfer__item-content').slideUp(500);
          currentParent.classList.remove(openedClass);
        }
      }
    });
  }
}

subMenuToShow();

//////////////////////////////////////////////////////////////////

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('showAnim');
    }
  });
}
let options = {
  threshold: [0.5],
};
let observer = new IntersectionObserver(onEntry, options);

let sectionTitle = Array.from(document.querySelectorAll('.section__title'));

for (let item of sectionTitle) {
  item.classList.add('animation-prepare');
}

let elements = document.querySelectorAll('.animation-prepare');

for (let elm of elements) {
  observer.observe(elm);
}

//////////////////////////////////////////////////////////////////

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
  V = 0.1; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener(
    'click',
    function (e) {
      //по клику на ссылку
      e.preventDefault(); //отменяем стандартное поведение
      var w = window.pageYOffset, // производим прокрутка прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
      (t = document.querySelector(hash).getBoundingClientRect().top), // отступ от окна браузера до id
        (start = null);
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
          r =
            t < 0
              ? Math.max(w - progress / V, w + t)
              : Math.min(w + progress / V, w + t);
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash; // URL с хэшем
        }
      }
    },
    false
  );
}

//////////////////////////////////////////////////////////////////

window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;
  let sticks = document.querySelectorAll('.stick__container');
  
  if (sticks.length >=1) {
    sticks.forEach((element) => {
      if (element.offsetTop <= scrollDistance + 100) {
        element.classList.add('stick__active');
      } else {
        element.classList.remove('stick__active');
      }
    });
  }
})

// кастомізація input type number

$(function () {
  (function quantityProducts() {
    var $quantityArrowMinus = $(".quantity__arrow--minus");
    var $quantityArrowPlus = $(".quantity__arrow--plus");
    var $quantityNum = $(".quantity__number");

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      if ($quantityNum.val() > 1) {
        $quantityNum.val(+$quantityNum.val() - 1);
      }
    }

    function quantityPlus() {
      $quantityNum.val(+$quantityNum.val() + 1);
    }
  })();
});

// кастомізація випадаючого списку sellect

function makeСhoice() {
  const elements = Array.from(document.querySelectorAll('.js-choice'));
  
  elements.forEach((element) => {
    let choices = new Choices(element, {
      searchEnable: false,
      itemSelectText: '',
    });
  });
}

makeСhoice();

///////////////////////////////////////////////////////

function busketShow() {
  const basketBtns = Array.from(document.querySelectorAll('.store__item-basket'));
  const basketPopup = document.querySelector('.order');
  const body = document.querySelector('body');
  const popupCloseBtn = document.querySelector('.order__close-btn');

  basketBtns.forEach((element) => {
    element.addEventListener('click', () => {
      basketPopup.style.display = 'block';
      body.classList.add('lock');
    })
  });

  document.querySelector('.order__close-btn').addEventListener('click', () => {
    basketPopup.style.display = 'none';
    body.classList.remove('lock');
  });
}

busketShow();