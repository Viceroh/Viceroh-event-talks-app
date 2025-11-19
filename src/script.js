document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const scheduleContainer = document.getElementById('schedule');
    const talks = Array.from(scheduleContainer.getElementsByClassName('schedule-item'));

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        talks.forEach(talk => {
            if (talk.classList.contains('break')) {
                return;
            }

            const categories = Array.from(talk.getElementsByClassName('category'));
            const match = categories.some(category => category.textContent.toLowerCase().includes(searchTerm));

            if (match) {
                talk.style.display = '';
            } else {
                talk.style.display = 'none';
            }
        });
    });
});
