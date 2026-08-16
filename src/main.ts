import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";

import { BOT_TOKEN } from "./config";
import { allBlocks } from "./randomExercise";

const random = (trainings: string[]) => trainings[Math.floor(Math.random() * trainings.length)]!

const main = Object.entries(allBlocks).reduce((menu, [blockId, block]) => {
  const submenu = Object.entries(block.skills).reduce((submenu, [skill, trainings]) => {
    return submenu
    .text(skill, (ctx) => {
      return ctx.reply(random(trainings))
    })
    .row()
  }, new Menu(blockId))
  .back("Вернуться к выбору блока");

  menu
    .text(block.name, (ctx) => ctx.reply("Выбери навык:", { reply_markup: submenu }))
    .row()
    .register(submenu)

  return menu
}, new Menu('root-menu'))

const bot = new Bot(BOT_TOKEN);

bot.use(main);

bot.command("start", (ctx) =>
  ctx.reply(
    "Добро пожаловать. Этот бот поможет с идеями, как практиковать навыки. Выбери блок:",
    { reply_markup: main },
  ),
);

bot.start();
