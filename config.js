const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZDVWpzTS9iRzh5SFJXVGFuaHpseHdsLzJPV1RrdElXMmJBemUwNlNFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlhlRTl0WmtYSnZZVkliZFdEc0JhK01VQXlIWVd4djBlTXRBZXBHSVJ6MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLS3JTamRVUHAwK2U5Skl4eDUrdWFINGFTMjdkbTBiS1JtVEpCUy95SVhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2Y2xLZ0NKY1RUSzExTkdUOElodmlGL3c5R21CN1hLSDRQL2JDVXlVRVU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtDOVVwRmJ0M0ZKOFZlYjJvMzJqbmRHa1RIYThxUTI5eHdERzg2QlBRMjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InF2eWRBem51MU1hVkNzdGZwbUFIeTJWaGhFd25lU0I5b3RLVFU3VzN0U0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUZvSkRqQ3VJa0ZmOXREWlRsU1BLeVNaZ3IzZzRxS2VsZGFQWDlJZ2EyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblBQeWdPTGlESTRmVWVoVGpwN3lWRGpSR3NFOWVVU3ZkOUhJMDZvN2wzND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZWbzlvRk5NMnkzQVlvZEVjSjZDYnRJTnAvU1dLRmR0VHI4S1l0MWIvWVM0TGZYa2xBNGRMKzNnK3I2M2hHVlZoVzFSci9iNDAvZnFKcHArM3VwRWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ0LCJhZHZTZWNyZXRLZXkiOiJqbFZXaHBuaFkyR3Y5NG1ueHdrWlBXYkNLSUpoSGdxOEl2dkNzeFRnYjMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJBWDhDNDVWRSIsIm1lIjp7ImlkIjoiOTQ3Nzc5NDM4NDg6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiKkNcblxuWVxuXG5CXG5cbkVcblxuUlxuXG5EXG5cbkFcblxuTlxuXG5HXG5cbkVcblxuUlxuXG5aXG5cbk9cblxuTlxuXG5DXG5cbllcblxuQlxuXG5FXG5cblJcblxuQVxuXG5TXG5cbkFcblxuTlxuXG5LXG5cbkEqIiwibGlkIjoiMTU2MTk1Mjc2OTgwNDQ2OjIwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTdjbmVzREVNREg3NzhHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTjl4RGFiVmptaDA2aFUzOE80WXlXUjBvRVg4MkpaNktwdVJZeHYrOUlYWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSy9lTmErY3ZoZDN1dEIyLzZ2elFUMmkvcE93M2hJOFBpRG15eW1nelBQeDB0bFI0ZGJrZi9tYkRpM0xucW9WVlN2NEIvUHp1dng4L1NHYXAreVZHQnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImhiTU1BNnFvSXp3aVRVeXZIUVU4SE5ESmNPOUJvUzFTZHd4M0toeFMxT2ozYmx1YU1XZ3hDOHZsa1M3cjNQN3pHVE1hcGY1UGhZb1VzeDcrMWpXOGp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3Nzc5NDM4NDg6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGZjUTJtMVk1b2RPb1ZOL0R1R01sa2RLQkYvTmlXZWlxYmtXTWIvdlNGMiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ0NTYxMTAxLCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRzArIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
