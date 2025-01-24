// hamburger drawer
jQuery(function ($) {
  // hamburger menu
  $(function () {
    $(".js-hamburger,.js-drawer").on("click", function () {
      toggleDrawer();
    });

    // ページ内リンクをクリックしたら閉じる
    // ドロワーメニュー内のリンクがクリックされたときの処理
    $(".js-drawer a[href]").on("click", function(e) {
      e.preventDefault(); // デフォルトのリンク動作を防止

      const targetId = $(this).attr('href'); // クリックされたリンクのhref属性を取得
      const isInPageLink = targetId.charAt(0) === '#'; // ページ内リンクかどうかを判定
      
      if (isInPageLink) {
        // ページ内リンクの場合、スムーズスクロールを実行
        $('html, body').animate({
          scrollTop: $(targetId).offset().top
        }, 800);
      } else {
        // 外部リンクの場合、そのページに遷移
        window.location.href = targetId;
      }    
      closeDrawer(); 
    });

    // resize event
    $(window).on('resize', function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeDrawer();
      }
    });
  });

  function toggleDrawer() {
    if ($(".js-drawer").is(":visible")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function openDrawer() {
    $(".js-drawer").fadeIn();
    $(".js-hamburger").addClass("is-active");
    $("body").addClass("is-drawer-active");
  }

  function closeDrawer() {
    $(".js-drawer").fadeOut();
    $(".js-hamburger").removeClass("is-active");
    $("body").removeClass("is-drawer-active");
  }  
});

// scroll to top button
jQuery(function ($) {
function initScrollToTopButton() {
  const scrollButton = $('.scroll-to-top-btn');
  
  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    const fvHeight = $('.fv').outerHeight();

    if (scrollTop > fvHeight) {
      scrollButton.addClass('show');
    } else {
      scrollButton.removeClass('show');
    }
  });

  scrollButton.on('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

initScrollToTopButton();
});

// color box
jQuery(function ($) {
// ----------------------------------------------
  function initColorBox() {
    const speed = 500;
    const $box = $(".js-colorbox");
    

    $box.each(function() {
      const $currentBox = $(this);
      $currentBox.append('<div class="js-color"></div>');
      const $color = $currentBox.find(".js-color");
      const $image = $currentBox.find("img");
      let counter = 0;

      $image.css("opacity", "0");
      $color.css("width", "0%");

      // 画像がビューポート内に入ったらアニメーションを実行
      $currentBox.on("inview", function(event, isInView) {
        if (isInView && counter === 0) {
          $color.animate({ width: "100%" }, speed * 1.5, function() {
            $image.css("opacity", "1");
            $color.css({
              left: "0",
              right: "auto"
            }).animate({ width: "0%" }, speed * 0.7);
          });
          counter = 1;
        }
      });
    });
  }

  function animateColorBox(color, image, speed) {
    color.animate({ width: "100%" }, speed * 1.5, function() {
      image.css("opacity", "1");
      color.css({ left: "0", right: "auto" }).animate({ width: "0%" }, speed * 0.7);
    });
  }

  initColorBox();
  animateColorBox();
});


// campaign slick slider
jQuery(function ($) {
const $card__slider = $('.js-campaign-slider');
function initSlick() {
  $($card__slider).slick({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    infinite: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    cssEase: 'linear',
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          slidesToShow: 1,
          variableWidth: true,
          autoplaySpeed: 4000
        }
      }
    ]
  });
}

initSlick();
});


// loading animation
jQuery(function ($) {

function confirm_session_storage() {
  const isFirstLoad = sessionStorage.getItem('isFirstLoad');
  // const $loadingContainer = $('.js-fv-loading-container');
  const $loadingContainer = $('.js-fv-loading');
  const $header = $('.header');

  
  window.addEventListener('load', function() {
    // 初回アクセス時
    if (!isFirstLoad) {
      initialShowAndHideTitle();
      initFvAnimation();
      initLoadingCompletion();

      sessionStorage.setItem('isFirstLoad', true);
    // 2回目以降
    } else {
      $loadingContainer.hide();
      $header.addClass('is-active');
      
      init_fv_slider(0);
    }
  });
}

// fv slick slider
function init_fv_slider($initialSlide) {
  const $slider = $('.js-fv-slider');
  $slider.slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 3000,
    infinite: true,
    cssEase: 'ease-in-out',
    fade: true,
    initialSlide: $initialSlide
  });
  $slider.css('opacity', '1');
}

function initialShowAndHideTitle() {
  const $title = $(".js-fv-content");

// タイトルを同時に表示し、1秒後にヘッダーをフェードアウト
  $title.addClass('js-visible--loading');
        
  setTimeout(() => {
    $title.removeClass('js-visible--loading').addClass('js-hidden');
  }, 1500);
}


/* fv ローディングアニメーションとswiper */
function initFvAnimation() {
  const $title = $(".js-fv-content");
  // const $animationContainer = $(".js-fv-loading-container");
  const $animationContainer = $(".js-fv-loading");
  const $header = $(".js-top-header");
  const $loading = $(".fv__loading");
  const $leftImage = $('.fv__loading-image--left');
  const $rightImage = $('.fv__loading-image--right');

  // アニメーションのキーフレームを追加
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes slideUpLeft {
      to {
        transform: translateY(0);
      }
    }
    @keyframes slideUpRight {
      to {
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleSheet);


  // アニメーションを適用
  $leftImage.css('animation', 'slideUpLeft 1.5s 1.8s forwards');
  $rightImage.css('animation', 'slideUpRight 1.5s 2.0s forwards');

  // アニメーション完了を待ってから次の処理を実行
  $rightImage.on('animationend', function() {
    hideAnimationAndStartSlider($animationContainer, $header, $title, $loading);
  });
}

function hideAnimationAndStartSlider($animationContainer, $header, $title, $loading) {
  const $slider = $('.js-fv-slider');
  $slider.css('opacity', '1');
  
  init_fv_slider(1);

  // ローディングアニメーションをフェードアウト
  $animationContainer.addClass('is-fadeout');
  
  // フェードアウトのトランジション時間後にスライダーをフェードイン
  setTimeout(() => {
    $slider.animate({
      opacity: 1
    }, 1000, function() {
      $slider.slick('slickPlay');
    });
  }, 2000);
}

function initLoadingCompletion() {
  $(document).ready(function() {
    const header = $('.header');
    const fvLoading = $('.fv__loading');
    const fvTitle = $('.js-fv-content');

    fvLoading.on('animationend', function() {
      setTimeout(() => {
        header.add(fvTitle).css({
          transition: 'opacity 2s ease-in-out',
          opacity: '1'
        });
        header.addClass('is-active');
      });
    });

  });
}

// 関数の実行
confirm_session_storage(); 
});
