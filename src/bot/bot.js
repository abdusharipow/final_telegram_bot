
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import onCommands from "./hendlers/message/onCommands.js";
import onError from "./hendlers/message/onError.js";
dotenv.config();
const CHANNEL_ID = "@neww_kanall";
export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);

  console.log(chatMember);

  if (chatMember.status == "kicked" || chatMember.status == "left") {
    return bot.sendMessage(
      chatId,
      `Oldin shu kanalga obuna bo'ling @neww_kanall`,
      {
        reply_markup: {
          remove_keyboard: true,
          inline_keyboard: [
            [
              {
                text: "@neww_kanall",
                url: "https://t.me/neww_kanall",
              },
            ],
            [
              {
                text: "Obunani tasdiqlash ✅",
                callback_data: "confirm_subscription",
              },
            ],
          ],
        },
      }
    );
  }

  if (text.startsWith("/")) {
    return onCommands(msg);
  } else if (text == "📚 Kurslar") {
     bot.sendMessage(chatId, `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🇬🇧 Ingliz tili", callback_data: "english" }],
          [{ text: "🇷🇺 Rus tili", callback_data: "russian" }],
          [{ text: "🧮 Matematika", callback_data: "math" }],
          [{ text: "💻 Dasturlash", callback_data: "it" }],
          [{ text: "🎨 Grafik dizayn", callback_data: "design" }],
        ]
      }
    });
  }   else if (text == "ℹ️ Markaz haqida") {
    bot.sendMessage(chatId, `
      ℹ️ MARKAZ HAQIDA

🎓 100x o‘quv markazi
📍 Manzil: Xiva IT PARK ichida
⏰ Ish vaqti: Dush–Yak, 9:00–19:00
📞 .........
      `)
  }  else if (text == "💬 Fikr bildirish") {
    bot.sendMessage(chatId,
      `
      💬 Marxamat, o‘quv markazimiz haqida fikr qoldirishingiz mumkin.

Quyidagilardan birini tanlang 👇
      `, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "⭐ Baxolash", callback_data: "baxolash" }],
          [{ text: "✍️ Matn yozish", callback_data: "matn yozish" }]
        ]
      }
    })
  }  else if (text == "❓ Yordam") {
    bot.sendMessage(chatId, `
      Yordam uchun Admin ga murojat qiling
      Admin:  @shoxruxx_abdushar1povv
      `)
  }  else {
    bot.sendMessage(
      chatId,
      `
     ⚠️ Kechirasiz, men sizning xabaringizni tushunmadim.

 Iltimos, quyidagi tugmani bosing 👇
  /start

     `
    );
  }

  return onError();
});

bot.on("callback_query", async function (query) {
  const chatId = query.message.chat.id;
  const firstname = query.message.chat.first_name;
  const data = query.data;
  if (data === "english") {
       bot.sendMessage(chatId, `
      🇬🇧 Ingliz tili kursi (IELTS tayyorlov)
📘 Maqsad: 5.5 dan 7.0 gacha olib chiqish
⏳ Davomiyligi: IELTS olguncha
💵 Narxi: 500 ming so‘m / oyiga
👨‍🏫 Ustoz: ....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
    } else if (data === 'russian') {
    bot.sendMessage(chatId, `
      🇷🇺 Rus tili (Suhbat darajasi)
      📘 Maqsad: Ish / o‘qish uchun so‘zlashuv darajasi
⏳ 2 oy, haftasiga 3 marta
💵 400 ming so‘m / oy
👨‍🏫 Ustoz: .....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if (data == "math") {
    bot.sendMessage(chatId, `
      🧮 Matematika (maktab va abituriyentlar uchun)
🎯 Maqsad: Formulalarni to‘liq tushunish va test yechish
⏳ 4 oy
💵 450 ming so‘m / oy
👨‍🏫 Ustoz: .....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if (data == "it") {
    bot.sendMessage(chatId, `
          💻 Dasturlash (Frontend va Backend)
🎯 Maqsad: 0 dan Junior darajaga
⏳ 6 oy
💵 600 ming so‘m / oy
👨‍🏫 Mentor: ....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  } else if (data == "design") {
    bot.sendMessage(chatId, `
          🎨 Grafika dizayn (Adobe, Canva)
🎯 Maqsad: Logo, banner, post tayyorlashni o‘rganish
⏳ 3 oy
💵 500 ming so‘m / oy
👨‍🏫 Ustoz: ....
      `, {
      reply_markup: {
        inline_keyboard: [[{ text: "✍️ Kursga yozilish", callback_data: "yozilish" }]]
      }
    });
  }  else if (data == "baxolash") {
    bot.sendMessage(
      chatId,
      `
Nechchi ball bilan baholaysiz?
Iltimos, quyidagi yulduzlardan birini tanlang ⭐
      `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⭐ 1", callback_data: "1" }],
            [{ text: "⭐⭐ 2", callback_data: "2" }],
            [{ text: "⭐⭐⭐ 3", callback_data: "3" }],
            [{ text: "⭐⭐⭐⭐ 4", callback_data: "4" }],
            [{ text: "⭐⭐⭐⭐⭐ 5", callback_data: "5" }]
          ]
        },
      }
    );
  } else if (data == "1") {
    bot.sendMessage(chatId, `Raxmat,balingiz qabul qilindi ✅`)
  } else if (data == "2") {
    bot.sendMessage(chatId, `Raxmat,balingiz qabul qilindi ✅`)
  } else if (data == "3") {
    bot.sendMessage(chatId, `Raxmat,balingiz qabul qilindi ✅`)
  } else if (data == "4") {
    bot.sendMessage(chatId, `Raxmat,balingiz qabul qilindi ✅`)
  } else if (data == "5") {
    bot.sendMessage(chatId, `Raxmat,balingiz qabul qilindi ✅`)
  } else if (data == "matn yozish") {
    bot.sendMessage(chatId, `Fikr yozing `)
  }
  if (data == "confirm_subscription") {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
    
    console.log(chatMember);

    if (chatMember.status == "kicked" || chatMember.status == "left") {
      return bot.sendMessage(
        chatId,
        `Oldin shu kanalga obuna bo'ling @neww_kanall`,
        {
          reply_markup: {
            remove_keyboard: true,
            inline_keyboard: [
              [
                {
                  text: "100x Academy Xiva",
                  url: "https://t.me/neww_kanall",
                },
              ],
              [
                {
                  text: "Obunani tasdiqlash ✅",
                  callback_data: "confirm_subscription",
                },
              ],
            ],
          },
        }
      );
    } 
  }
});

console.log("Bot ishga tushdi...");
