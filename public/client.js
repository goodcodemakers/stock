// JavaScript 코드 (public/client.js)
const stockForm = document.getElementById('stockForm');
const productNameInput = document.getElementById('productName');
const quantityInput = document.getElementById('quantity');
const noteInput = document.getElementById('note');
const stockList = document.getElementById('stockList');
const searchInput = document.getElementById('searchInput');

// 재고 등록
stockForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = productNameInput.value;
    const quantity = parseInt(quantityInput.value);
    const note = noteInput.value;

    if (productName.trim() === '' || isNaN(quantity) || quantity <= 0 || note.trim() === '') {
        alert('올바른 제품명, 수량, 비고를 입력하세요.');
        return;
    }

    // 등록된 제품을 화면에 표시
    const listItem = document.createElement('li');
    listItem.textContent = `${productName} - ${quantity}개 - ${note}`;
    
    // 삭제 버튼 추가
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function() {
        listItem.remove();
    });
    listItem.appendChild(deleteButton); 

    // 수정 버튼 추가
    const editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.addEventListener('click', function() {
        const newQuantity = prompt('새로운 수량을 입력하세요:', quantity);
        if (newQuantity === null || isNaN(newQuantity) || newQuantity.trim() === '') {
            return;
        }
        quantityInput.value = newQuantity;
        listItem.textContent = `${productName} - ${newQuantity}개 - ${note}`;
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
    });
     
    
    listItem.appendChild(editButton);

    stockList.appendChild(listItem);

    // 입력 필드 초기화
    productNameInput.value = '';
    quantityInput.value = '';
    noteInput.value = '';
});

// 재고 검색
function search() {
    const searchText = searchInput.value.toLowerCase();
    const items = stockList.getElementsByTagName('li');
    for (let item of items) {
        const itemName = item.textContent.toLowerCase().split(' - ')[0] ;
        if (itemName.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}
