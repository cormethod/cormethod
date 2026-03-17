/**
 * COR-метод — Главный JavaScript файл
 * 
 * НАСТРОЙКИ GOOGLE FORMS:
 * Замените GOOGLE_FORM_ID на ID вашей формы (из URL)
 * Замените entry IDs на реальные из вашей формы
 */

// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
  // ID формы Google Forms (из URL: .../d/e/ВОТ_ЭТОТ_ID/viewform)
  GOOGLE_FORM_ID: '1FAIpQLSequSuQF1ounTXy8OwBEh3atHSXXY19NWS3ERrcT_Hk1_kImg',
  
  // Entry IDs полей формы (как найти: откройте форму → F12 → найдите input с name="entry.XXXXXX")
  // ИЛИ: создайте предзаполненную ссылку и посмотрите числа в URL
  FORM_ENTRIES: {
    name: 'entry.2005620554',    // ← ЗАМЕНИТЬ на реальный entry ID для поля "Имя"
    email: 'entry.1045781291',   // ← ЗАМЕНИТЬ на реальный entry ID для поля "Email"
    phone: 'entry.1166974658',   // ← ЗАМЕНИТЬ на реальный entry ID для поля "Телефон"
    product: 'entry.789123456', // ← ЗАМЕНИТЬ - поле для названия продукта (опционально)
    source: 'entry.111222333',  // ← ЗАМЕНИТЬ - источник заявки (опционально)
  }
};

// ===== ОТПРАВКА В GOOGLE FORMS =====
async function submitToGoogleForm(data) {
  const url = `https://docs.google.com/forms/d/e/${CONFIG.GOOGLE_FORM_ID}/formResponse`;
  
  const formData = new FormData();
  
  // Добавляем данные в форму
  Object.keys(data).forEach(key => {
    if (CONFIG.FORM_ENTRIES[key]) {
      formData.append(CONFIG.FORM_ENTRIES[key], data[key] || '');
    }
  });
  
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
    return true;
  } catch (error) {
    console.error('Error submitting to Google Forms:', error);
    return false;
  }
}

// ===== TOAST УВЕДОМЛЕНИЯ =====
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  
  toastMessage.textContent = message;
  toastIcon.textContent = type === 'success' ? '✓' : '✕';
  
  toast.className = 'toast active';
  if (type === 'error') {
    toast.classList.add('error');
  }
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function openModal(type) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  
  let content = '';
  
  switch(type) {
    case 'consult':
      content = `
        <h2 class="modal-title">Запись на консультацию</h2>
        <p class="modal-desc">Оставьте контакты — мы свяжемся с вами в ближайшее время</p>
        <form onsubmit="submitForm(event, 'consult')">
          <div class="form-group">
            <label for="modal-name">Имя</label>
            <input type="text" id="modal-name" name="name" placeholder="Ваше имя" required>
          </div>
          <div class="form-group">
            <label for="modal-email">Email</label>
            <input type="email" id="modal-email" name="email" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label for="modal-phone">Телефон</label>
            <input type="tel" id="modal-phone" name="phone" placeholder="+7 (999) 000-00-00" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Отправить заявку</button>
        </form>
      `;
      break;
      
    case 'book':
      content = `
        <h2 class="modal-title">Скачать книгу бесплатно</h2>
        <p class="modal-desc">Оставьте email — мы отправим книгу и будем держать в курсе новых материалов</p>
        <form onsubmit="submitForm(event, 'book')">
          <div class="form-group">
            <label for="modal-name">Имя</label>
            <input type="text" id="modal-name" name="name" placeholder="Ваше имя" required>
          </div>
          <div class="form-group">
            <label for="modal-email">Email</label>
            <input type="email" id="modal-email" name="email" placeholder="your@email.com" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Получить книгу
          </button>
          <p style="font-size: 0.75rem; color: var(--muted); text-align: center; margin-top: 1rem;">
            Нажимая кнопку, вы соглашаетесь получать рассылку. Отписаться можно в любой момент.
          </p>
        </form>
      `;
      break;
      
    case 'group':
      content = `
        <h2 class="modal-title">Онлайн-группы практиков COR</h2>
        <p class="modal-desc">Оставьте контакты — мы расскажем подробнее о марафоне</p>
        <form onsubmit="submitForm(event, 'group')">
          <div class="form-group">
            <label for="modal-name">Имя</label>
            <input type="text" id="modal-name" name="name" placeholder="Ваше имя" required>
          </div>
          <div class="form-group">
            <label for="modal-email">Email</label>
            <input type="email" id="modal-email" name="email" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label for="modal-phone">Телефон</label>
            <input type="tel" id="modal-phone" name="phone" placeholder="+7 (999) 000-00-00" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Отправить заявку</button>
        </form>
      `;
      break;
      
    case 'individual':
      content = `
        <h2 class="modal-title">Сопровождение COR-архитектора</h2>
        <p class="modal-desc">Оставьте контакты — мы свяжемся для записи на сессию</p>
        <form onsubmit="submitForm(event, 'individual')">
          <div class="form-group">
            <label for="modal-name">Имя</label>
            <input type="text" id="modal-name" name="name" placeholder="Ваше имя" required>
          </div>
          <div class="form-group">
            <label for="modal-email">Email</label>
            <input type="email" id="modal-email" name="email" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label for="modal-phone">Телефон</label>
            <input type="tel" id="modal-phone" name="phone" placeholder="+7 (999) 000-00-00" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Отправить заявку</button>
        </form>
      `;
      break;
  }
  
  modalBody.innerHTML = content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Закрытие модалки по клику вне контента
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Закрытие модалки по Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ===== ОБРАБОТКА ФОРМ =====
async function submitForm(event, type) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || '',
  };
  
  // Добавляем дополнительные поля в зависимости от типа формы
  if (type === 'book') {
    data.product = 'Книга';
    data.source = 'Скачивание книги';
  } else if (type === 'consult') {
    data.product = 'Консультация';
    data.source = 'Запись на консультацию';
  } else if (type === 'group') {
    data.product = 'Групповое обучение';
    data.source = 'Узнать о групповом обучении';
  } else if (type === 'individual') {
    data.product = 'Индивидуальное сопровождение';
    data.source = 'Запись на индивидуальную сессию';
  } else if (type === 'final') {
    data.product = 'Консультация';
    data.source = 'Финальная CTA';
  }
  
  // Отправляем в Google Forms
  const success = await submitToGoogleForm(data);
  
  if (success) {
    // Показываем успешное сообщение
    const modalBody = document.getElementById('modalBody');
    
    if (type === 'book') {
      showToast('Спасибо! Проверьте email для получения книги.');
    } else {
      showToast('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    }
    
    // Если это модалка, показываем успешный экран
    if (modalBody && document.getElementById('modal').classList.contains('active')) {
      modalBody.innerHTML = `
        <div class="modal-success">
          <div class="success-icon">✓</div>
          <h3>${type === 'book' ? 'Спасибо!' : 'Заявка отправлена!'}</h3>
          <p>${type === 'book' ? 'Проверьте email для получения книги' : 'Мы свяжемся с вами в ближайшее время'}</p>
        </div>
      `;
      
      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      // Если это форма на странице, очищаем её
      form.reset();
      
      // Показываем успешный экран для финальной формы
      if (type === 'final') {
        const formContainer = form.parentElement;
        formContainer.innerHTML = `
          <div class="modal-success" style="padding: 3rem;">
            <div class="success-icon">✓</div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время для согласования времени консультации</p>
          </div>
        `;
      }
    }
  } else {
    showToast('Ошибка отправки. Попробуйте позже.', 'error');
  }
}

// ===== FAQ АККОРДЕОН =====
function toggleFaq(button) {
  const item = button.parentElement;
  const isActive = item.classList.contains('active');
  
  // Закрываем все открытые
  document.querySelectorAll('.faq-item.active').forEach(el => {
    el.classList.remove('active');
  });
  
  // Открываем текущий, если он был закрыт
  if (!isActive) {
    item.classList.add('active');
  }
}

// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    
    if (isVisible) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== ФИКСИРОВАННЫЙ HEADER =====
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем класс animate к секциям для анимации
  document.querySelectorAll('section h2, section .section-subtitle').forEach(el => {
    el.classList.add('animate');
  });
  
  // Запускаем анимацию
  animateOnScroll();
});

// ===== ЭКСПОРТ ФУНКЦИЙ ДЛЯ HTML =====
window.openModal = openModal;
window.closeModal = closeModal;
window.submitForm = submitForm;
window.toggleFaq = toggleFaq;
window.showToast = showToast;
