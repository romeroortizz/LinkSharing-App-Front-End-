
export const PLATFORM_STYLES = [

  { value: "GitHub",           emoji: "🐙",  color: "#181717", text: "#FFFFFF" },
  { value: "Facebook",         emoji: "📘",  color: "#1877F2", text: "#FFFFFF" },
  
  { value: "Twitter",          emoji: "🐦",  color: "#1DA1F2", text: "#FFFFFF", aliases: ["X"] },
  { value: "Frontend Mentor",  emoji: "🎓",  color: "#3F54A3", text: "#FFFFFF" },
  { value: "LinkedIn",         emoji: "💼",  color: "#0A66C2", text: "#FFFFFF" },
  { value: "YouTube",          emoji: "▶️",  color: "#FF0000", text: "#FFFFFF" },
  { value: "Twitch",           emoji: "🎮",  color: "#9146FF", text: "#FFFFFF" },
  { value: "Dev.to",           emoji: "🛠️",  color: "#0A0A0A", text: "#FFFFFF" },
  { value: "Codewars",         emoji: "⚔️",  color: "#B1361E", text: "#FFFFFF" },
  { value: "CodePen",          emoji: "🖊️",  color: "#000000", text: "#FFFFFF" },
  { value: "FreeCodeCamp",     emoji: "⛺",  color: "#0A0A23", text: "#FFFFFF" }, 
  { value: "GitLab",           emoji: "🦊",  color: "#FC6D26", text: "#FFFFFF" },
  { value: "Hashnode",         emoji: "#️⃣", color: "#2962FF", text: "#FFFFFF" },
  { value: "Stack Overflow",   emoji: "📤",  color: "#F48024", text: "#000000" }


]



export default function getColor(platformName) {
    
    const styleValues = PLATFORM_STYLES.find(PS => PS.value.toLowerCase() === platformName.toLowerCase())
    return [styleValues.color,styleValues.text]
}
