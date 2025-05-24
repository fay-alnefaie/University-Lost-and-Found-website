document.addEventListener('DOMContentLoaded', function() {
    const lostItemForm = document.getElementById('lostItemForm');
    const foundItemForm = document.getElementById('foundItemForm');
    const postsContainer = document.getElementById('postsContainer');
    const filterButton = document.getElementById('filter-button');

    if (lostItemForm) {
        lostItemForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const itemData = new FormData(lostItemForm);
            saveItem('lost', itemData);
        });
    }

    if (foundItemForm) {
        foundItemForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const itemData = new FormData(foundItemForm);
            saveItem('found', itemData);
        });
    }

    if (postsContainer) {
        displayItems(postsContainer);
    }

    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const typeFilter = document.getElementById('item-type-filter').value;
            const statusFilter = document.getElementById('item-status-filter').value;
            const dateStartFilter = document.getElementById('date-start-filter').value;
            const dateEndFilter = document.getElementById('date-end-filter').value;
            filterItems(postsContainer, typeFilter, statusFilter, dateStartFilter, dateEndFilter);
        });
    }
});

function saveItem(type, itemData) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    const item = {
        type: type,
        location: itemData.get('item-location'),
        buildingName: itemData.get('building-name'),
        classNumber: itemData.get('class-number'),
        itemType: itemData.get('item-type'),
        description: itemData.get('item-description'),
        date: itemData.get(type === 'lost' ? 'lost-date' : 'found-date'),
        contact: itemData.get('contact-info'),
        additionalInfo: itemData.get('additional-info'),
        ownerFirstName: itemData.get('first-name'),
        ownerLastName: itemData.get('last-name'),
        ownerEmail: itemData.get('email'),
        ownerPhone: itemData.get('phone'),
        ownerIdType: itemData.get('id-type'),
        ownerIdNumber: itemData.get('id-number')
    };
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} item submitted successfully!`);
}

function displayItems(container) {
    container.innerHTML = ''; // Clear previous items
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h3>${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Item</h3>
            <p><strong>Type:</strong> ${item.itemType}</p>
            <p><strong>Contact:</strong> ${item.contact}</p>
            <button onclick="toggleItemDetails(${index})">View Details</button>
            <div id="item-details-${index}" class="item-details" style="display: none;">
                <p><strong>Inside a building?</strong> ${item.location}</p>
                <p><strong>Building Name:</strong> ${item.buildingName}</p>
                <p><strong>Class Number:</strong> ${item.classNumber}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Additional Info:</strong> ${item.additionalInfo}</p>
                <p><strong>Owner Name:</strong> ${item.ownerFirstName} ${item.ownerLastName}</p>
                <p><strong>Owner Email:</strong> ${item.ownerEmail}</p>
                <p><strong>Owner Phone:</strong> ${item.ownerPhone}</p>
                <p><strong>Owner ID Type:</strong> ${item.ownerIdType}</p>
                <p><strong>Owner ID Number:</strong> ${item.ownerIdNumber}</p>
                <button onclick="markAsFound(${index})">Mark as Found</button>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

function toggleItemDetails(index) {
    const detailsElement = document.getElementById(`item-details-${index}`);
    if (detailsElement.style.display === 'none') {
        detailsElement.style.display = 'block';
    } else {
        detailsElement.style.display = 'none';
    }
}

function markAsFound(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    alert('Item marked as found and removed from the list.');
    location.reload();
}


document.addEventListener("DOMContentLoaded", function() {
    var faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function(item) {
        var question = item.querySelector(".faq-question");
        var answer = item.querySelector(".faq-answer");
        var icon = item.querySelector(".faq-icon");

        question.addEventListener("click", function() {
            var isVisible = answer.style.display === "block";
            answer.style.display = isVisible ? "none" : "block";
            icon.classList.toggle("expanded", !isVisible);
        });
    });
});



function filterItems(container, type, status, dateStart, dateEnd) {
    container.innerHTML = ''; // Clear previous items
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(item => {
        const matchType = type ? item.itemType === type : true;
        const matchStatus = status ? item.type === status : true;
        const matchDate = dateStart && dateEnd ? new Date(item.date) >= new Date(dateStart) && new Date(item.date) <= new Date(dateEnd) : true;
        return matchType && matchStatus && matchDate;
    });
    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <h3>${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Item</h3>
            <p><strong>Type:</strong> ${item.itemType}</p>
            <p><strong>Contact:</strong> ${item.contact}</p>
            <button onclick="toggleItemDetails(${index})">View Details</button>
            <div id="item-details-${index}" class="item-details" style="display: none;">
                <p><strong>Inside a building?</strong> ${item.location}</p>
                <p><strong>Building Name:</strong> ${item.buildingName}</p>
                <p><strong>Class Number:</strong> ${item.classNumber}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Additional Info:</strong> ${item.additionalInfo}</p>
                <p><strong>Owner Name:</strong> ${item.ownerFirstName} ${item.ownerLastName}</p>
                <p><strong>Owner Email:</strong> ${item.ownerEmail}</p>
                <p><strong>Owner Phone:</strong> ${item.ownerPhone}</p>
                <p><strong>Owner ID Type:</strong> ${item.ownerIdType}</p>
                <p><strong>Owner ID Number:</strong> ${item.ownerIdNumber}</p>
                <button onclick="markAsFound(${index})">Mark as Found</button>
            </div>
        `;
        container.appendChild(itemElement);
    });
}
