/**
 * بوت الصحة الغذائية - Healthy Bot
 * بوت تلجرام للحصول على معلومات غذائية ونصائح صحية
 * 
 * @author Healthy Bot Team
 * @version 1.0.0
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { setupHandlers } = require('./handlers/commands');

// التحقق من وجود التوكن
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token || token === 'your_bot_token_here') {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN is not set!');
  console.error('Please set your bot token in .env file');
  console.error('Get your token from @BotFather on Telegram');
  process.exit(1);
}

// إنشاء البوت
const bot = new TelegramBot(token, { polling: true });

// إعداد معالجات الأوامر
setupHandlers(bot);

// رسالة بدء التشغيل
console.log('🌿 Healthy Bot is running!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📱 Bot is ready to receive messages');
console.log('🔄 Polling for updates...');
console.log('');
console.log('Available commands:');
console.log('  /start    - Start the bot');
console.log('  /help     - Show help');
console.log('  /food     - Search for food');
console.log('  /calories - Get calories info');
console.log('  /diet     - Diet plans');
console.log('  /tip      - Random tip');
console.log('  /bmi      - Calculate BMI');
console.log('');
console.log('Press Ctrl+C to stop the bot');

// معالجة إيقاف البوت
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping Healthy Bot...');
  bot.stopPolling();
  console.log('👋 Goodbye!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Stopping Healthy Bot...');
  bot.stopPolling();
  process.exit(0);
});

// تصدير البوت للاختبار
module.exports = { bot };
