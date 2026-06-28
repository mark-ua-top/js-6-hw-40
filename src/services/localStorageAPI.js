/**
 * Local Storage API - імітація бекенду
 * Всі дані зберігаються в localStorage браузера
 */

const STORAGE_KEYS = {
  USERS: 'contacts_app_users',
  CURRENT_USER: 'contacts_app_current_user',
  CONTACTS: 'contacts_app_contacts',
};

// ============== Утиліти ==============

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const generateToken = () => {
  return 'token_' + generateId() + '_' + generateId();
};

const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
};

// ============== Users API ==============

/**
 * Реєстрація нового користувача
 */
export const signUp = async ({ name, email, password }) => {
  // Імітація затримки мережі
  await new Promise(resolve => setTimeout(resolve, 300));

  // Валідація
  if (!name || name.trim().length < 1) {
    throw new Error("Ім'я обов'язкове");
  }
  if (!email || !email.includes('@')) {
    throw new Error('Невірний формат email');
  }
  if (!password || password.length < 7) {
    throw new Error('Пароль має бути мінімум 7 символів');
  }

  // Отримуємо існуючих користувачів
  const users = getFromStorage(STORAGE_KEYS.USERS) || [];

  // Перевіряємо чи email вже існує
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find(u => u.email === normalizedEmail);
  
  if (existingUser) {
    throw new Error('Користувач з таким email вже існує');
  }

  // Створюємо нового користувача
  const newUser = {
    id: generateId(),
    name: name.trim(),
    email: normalizedEmail,
    password, // В реальному проекті пароль має бути хешований!
    createdAt: new Date().toISOString(),
  };

  const token = generateToken();

  // Зберігаємо користувача
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);

  // Зберігаємо поточну сесію
  const session = { userId: newUser.id, token };
  saveToStorage(STORAGE_KEYS.CURRENT_USER, session);

  // Створюємо порожній масив контактів для користувача
  const allContacts = getFromStorage(STORAGE_KEYS.CONTACTS) || {};
  allContacts[newUser.id] = [];
  saveToStorage(STORAGE_KEYS.CONTACTS, allContacts);

  return {
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    token,
  };
};

/**
 * Вхід користувача
 */
export const logIn = async ({ email, password }) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!email || !password) {
    throw new Error('Email та пароль обов\'язкові');
  }

  const users = getFromStorage(STORAGE_KEYS.USERS) || [];
  const normalizedEmail = email.trim().toLowerCase();
  
  const user = users.find(
    u => u.email === normalizedEmail && u.password === password
  );

  if (!user) {
    throw new Error('Невірний email або пароль');
  }

  const token = generateToken();

  // Зберігаємо сесію
  const session = { userId: user.id, token };
  saveToStorage(STORAGE_KEYS.CURRENT_USER, session);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
};

/**
 * Вихід користувача
 */
export const logOut = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  return { success: true };
};

/**
 * Отримати поточного користувача
 */
export const getCurrentUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const session = getFromStorage(STORAGE_KEYS.CURRENT_USER);
  
  if (!session || !session.userId) {
    throw new Error('Не авторизовано');
  }

  const users = getFromStorage(STORAGE_KEYS.USERS) || [];
  const user = users.find(u => u.id === session.userId);

  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    throw new Error('Користувача не знайдено');
  }

  return { id: user.id, name: user.name, email: user.email };
};

// ============== Contacts API ==============

/**
 * Отримати ID поточного користувача
 */
const getCurrentUserId = () => {
  const session = getFromStorage(STORAGE_KEYS.CURRENT_USER);
  if (!session || !session.userId) {
    throw new Error('Не авторизовано');
  }
  return session.userId;
};

/**
 * Отримати всі контакти користувача
 */
export const fetchContacts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const userId = getCurrentUserId();
  const allContacts = getFromStorage(STORAGE_KEYS.CONTACTS) || {};
  
  return allContacts[userId] || [];
};

/**
 * Додати новий контакт
 */
export const addContact = async ({ name, number }) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!name || name.trim().length < 1) {
    throw new Error("Ім'я обов'язкове");
  }
  if (!number || number.trim().length < 3) {
    throw new Error('Номер телефону обов\'язковий');
  }

  const userId = getCurrentUserId();
  const allContacts = getFromStorage(STORAGE_KEYS.CONTACTS) || {};
  
  if (!allContacts[userId]) {
    allContacts[userId] = [];
  }

  // Перевірка на дублікат
  const exists = allContacts[userId].some(
    c => c.name.toLowerCase() === name.trim().toLowerCase()
  );
  
  if (exists) {
    throw new Error(`${name} вже є в контактах`);
  }

  const newContact = {
    id: generateId(),
    name: name.trim(),
    number: number.trim(),
    createdAt: new Date().toISOString(),
  };

  allContacts[userId].push(newContact);
  saveToStorage(STORAGE_KEYS.CONTACTS, allContacts);

  return newContact;
};

/**
 * Видалити контакт
 */
export const deleteContact = async (contactId) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const userId = getCurrentUserId();
  const allContacts = getFromStorage(STORAGE_KEYS.CONTACTS) || {};
  
  if (!allContacts[userId]) {
    throw new Error('Контакт не знайдено');
  }

  const contactIndex = allContacts[userId].findIndex(c => c.id === contactId);
  
  if (contactIndex === -1) {
    throw new Error('Контакт не знайдено');
  }

  const deletedContact = allContacts[userId][contactIndex];
  allContacts[userId].splice(contactIndex, 1);
  saveToStorage(STORAGE_KEYS.CONTACTS, allContacts);

  return deletedContact;
};

/**
 * Очистити всі дані (для тестування)
 */
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.CONTACTS);
};

/**
 * Експорт даних (для синхронізації між пристроями)
 */
export const exportData = () => {
  return {
    users: getFromStorage(STORAGE_KEYS.USERS) || [],
    contacts: getFromStorage(STORAGE_KEYS.CONTACTS) || {},
    exportedAt: new Date().toISOString(),
  };
};

/**
 * Імпорт даних (для синхронізації між пристроями)
 */
export const importData = (data) => {
  if (data.users) {
    const existingUsers = getFromStorage(STORAGE_KEYS.USERS) || [];
    const mergedUsers = [...existingUsers];
    
    data.users.forEach(importedUser => {
      if (!mergedUsers.find(u => u.email === importedUser.email)) {
        mergedUsers.push(importedUser);
      }
    });
    
    saveToStorage(STORAGE_KEYS.USERS, mergedUsers);
  }
  
  if (data.contacts) {
    const existingContacts = getFromStorage(STORAGE_KEYS.CONTACTS) || {};
    const mergedContacts = { ...existingContacts, ...data.contacts };
    saveToStorage(STORAGE_KEYS.CONTACTS, mergedContacts);
  }
  
  return { success: true };
};
