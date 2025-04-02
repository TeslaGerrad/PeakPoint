// Use browser-compatible storage and encryption

// Simple encryption function using browser APIs
const encryptPassword = async (password) => {
  // Convert the string to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Hash the data with SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Save user credentials to localStorage (encrypted)
export const saveUserCredentials = async (email, password) => {
  try {
    // Encrypt the password
    const encryptedPassword = await encryptPassword(password);
    
    const userData = {
      email,
      password: encryptedPassword,
      lastLogin: new Date().toISOString()
    };
    
    // Store in localStorage
    localStorage.setItem('userCredentials', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving credentials:', error);
    return false;
  }
};

// Verify user credentials from localStorage
export const verifyLocalCredentials = async (email, password) => {
  try {
    const storedData = localStorage.getItem('userCredentials');
    
    if (!storedData) {
      return false;
    }
    
    const userData = JSON.parse(storedData);
    
    // Encrypt the provided password and compare
    const encryptedPassword = await encryptPassword(password);
    
    return userData.email === email && userData.password === encryptedPassword;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return false;
  }
};

// Check if we're running in Electron
export const isElectron = () => {
  return window && window.electron;
};

// This function will be used when the app is running in Electron
export const migrateToElectronStorage = async () => {
  if (isElectron()) {
    try {
      const storedData = localStorage.getItem('userCredentials');
      
      if (storedData) {
        const userData = JSON.parse(storedData);
        
        // Get user data path from Electron
        const userDataPath = await window.electron.getUserDataPath();
        const credentialsPath = window.electron.path.join(userDataPath, 'credentials.json');
        
        // Create directory if it doesn't exist
        window.electron.fs.mkdir(userDataPath);
        
        // Write credentials to file
        window.electron.fs.writeFile(credentialsPath, JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error migrating to Electron storage:', error);
    }
  }
};