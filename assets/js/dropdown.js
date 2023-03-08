document.addEventListener('DOMContentLoaded', function() {
  const dropdownContent = document.querySelector('.dropdown-content');
  const dropdownItems = dropdownContent.querySelectorAll('a');
  const maxDropdownHeight = 200; // 최대 높이값 (px)
  let isDropdownVisible = false; // 드롭다운 메뉴 보이는 상태인지 여부
  let timeoutId; // setTimeout 함수의 반환값

  // 드롭다운 버튼 클릭 시 메뉴 보이기/숨기기
  document.querySelector('.dropbtn').addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
    isDropdownVisible = dropdownContent.classList.contains('show');
  });

  // 마우스가 드롭다운 버튼 위에 있을 때, 드롭다운 메뉴 보이기
  document.querySelector('.dropbtn').addEventListener('mouseover', function() {
    dropdownContent.classList.add('show');
    isDropdownVisible = true;
  });

  // 마우스가 드롭다운 메뉴 위에 있을 때, 메뉴 숨기지 않기
  dropdownContent.addEventListener('mouseover', function() {
    isDropdownVisible = true;
    clearTimeout(timeoutId);
  });

  // 마우스가 드롭다운 메뉴에서 벗어날 때, 일정 시간 후에 메뉴 숨기기
  dropdownContent.addEventListener('mouseleave', function() {
    isDropdownVisible = false;
    timeoutId = setTimeout(function() {
      if (!isDropdownVisible) {
        dropdownContent.classList.remove('show');
      }
    }, 100);
  });

  // 다른 곳을 클릭하면 메뉴 숨기기
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn') && !dropdownContent.contains(event.target)) {
      dropdownContent.classList.remove('show');
      isDropdownVisible = false;
    }
  });

  // 창 크기 변경 시 드롭다운 메뉴 높이 조정
  window.addEventListener('resize', function() {
    if (dropdownContent.classList.contains('show')) {
      dropdownContent.style.height = 'auto';
    } else {
      dropdownContent.style.height = '';
    }
  });
});
