// Note: This fetches the server's public IP, not the client's IP.
// In production you might want to use req.ip or x-forwarded-for.
const getUserPublicIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json', { method: 'GET' });
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return '0.0.0.0'; // fallback
  }
};

module.exports = { getUserPublicIP };