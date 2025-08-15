// header load
function loadHTML(className, filePath, index = 0) {
	const elements = document.getElementsByClassName(className);
	const target = elements[index];
	if (!target) return console.warn(`${className} 요소를 찾을 수 없습니다.`);
	
	fetch(filePath)
		.then(res => {
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			return res.text();
		})
		.then(html => {
			target.innerHTML = html;
		})
		.catch(err => console.error(`${className} 로드 오류:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
	loadHTML('header', 'html/common/header.html', 0);
	loadHTML('footer', 'html/common/footer.html', document.getElementsByClassName('footer').length - 1);
});

function gnbMouseenter(){
	$(document).on('mouseenter','.header', function(){
		$('.header').addClass('-open-depth2')
	}).on('mouseleave','.header', function(){
		$('.header').removeClass('-open-depth2')
	})
}

gnbMouseenter()

/* 메인 */
document.addEventListener("DOMContentLoaded", () => {
	const tabContainer = document.querySelector(".place-category-tabs");
	const panels = document.querySelectorAll(".place-category-panels .tabs-panel");

	// Swiper 초기화 함수
	function initSwiper(container) {
		// 이미 초기화된 경우 중복 방지
		if (container.dataset.swiperInit) return;

		new Swiper(container.querySelector(".place-area-swiper"), {
			slidesPerView:'auto',
			spaceBetween: 80,
			navigation: {
				nextEl: container.querySelector(".swiper-button-next"),
				prevEl: container.querySelector(".swiper-button-prev"),
			},
		});

		container.dataset.swiperInit = "true"; // 초기화 플래그
	}
		
	new Swiper(document.querySelector(".festival-swiper"), {
		slidesPerView:'auto',
		spaceBetween: 40,
		navigation: {
			nextEl: document.querySelector(".swiper-button-next"),
			prevEl: document.querySelector(".swiper-button-prev"),
		},
	});

	// 탭 클릭 이벤트
	tabContainer.addEventListener("click", (event) => {
		const button = event.target.closest("button");
		if (!button) return;

		// 탭 활성화 처리
		document.querySelectorAll(".place-category-tabs li").forEach(li => li.classList.remove("-active"));
		button.closest("li").classList.add("-active");

		// 패널 전환
		const panelId = button.getAttribute("aria-controls");
		panels.forEach(panel => panel.classList.remove("-active"));
		const activePanel = document.getElementById(panelId);
		if (activePanel) {
			activePanel.classList.add("-active");
			initSwiper(activePanel); // 탭이 활성화될 때 Swiper 초기화
		}
	});

	// 페이지 로드시 첫 번째 패널 Swiper 초기화
	const firstPanel = document.querySelector(".place-category-panels .tabs-panel.-active");
	if (firstPanel) {
		initSwiper(firstPanel);
	}
});
