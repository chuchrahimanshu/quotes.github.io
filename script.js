// FETCH QUOTE IMPLEMENTATION
const quoteAuthor = document.querySelector("#quote-box-header p");
const newQuoteButton = document.querySelector("#quote-box-header button");
const quote = document.querySelector("#quote");
const quoteTagsContainer = document.querySelector("#quote-box-footer");
const quoteBox = document.querySelector("#quote-box");

async function fetchNewQuote() {
  const response = await fetch(
    "https://api.freeapi.app/api/v1/public/quotes/quote/random"
  );
  const data = await response.json();

  quoteAuthor.textContent = data?.data?.author;
  quote.textContent = `❝${data?.data?.content}❞`;

  quoteTagsContainer.childNodes.forEach((child) =>
    quoteTagsContainer.removeChild(child)
  );

  data?.data?.tags?.forEach((tag) => {
    const p = document.createElement("p");
    p.className = "quote-tags";
    p.textContent = `#${tag}`;
    quoteTagsContainer.append(p);
  });

  if (!data?.data?.tags || data?.data?.tags?.length == 0) {
    quoteTagsContainer.remove();
  } else {
    quoteTagsContainer.style.display = "flex";
  }

  quoteBox.style.display = "block";
}
fetchNewQuote();

newQuoteButton.addEventListener("click", fetchNewQuote);

// COPY CLIPBOARD FUNCTIONALITY
const copyButton = document.querySelector("#copy-btn");

function copyToClipboard() {
  const quoteText = quote.textContent;
  navigator.clipboard.writeText(quoteText.slice(1, quoteText.length - 1));
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 500);
}

copyButton.addEventListener("click", copyToClipboard);

// SHARING TO TWITTER
const tweetButton = document.querySelector("#tweet-btn");

function shareQuoteToTwitter() {
  const quoteText = `${quote.textContent} ~ By ${quoteAuthor.textContent}`;

  const tags = [];
  quoteTagsContainer.childNodes.forEach((child) =>
    tags.push(child.textContent)
  );

  const tagString = tags.join(",")?.replaceAll("#", "");

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}&hashtags=${encodeURIComponent(tagString)}`;

  window.open(twitterUrl, '_blank');
}

tweetButton.addEventListener("click", shareQuoteToTwitter);

// THEME FUNCTIONALITY IMPLEMENTATION
const themeButton = document.getElementById("theme-btn");
const DARK_MODE = "🌝";
const LIGHT_MODE = "🌚";

function handleThemeToggle() {
  const DARK_BACKGROUND = "#111111";
  const LIGHT_BACKGROUND = "#eeeeee";
  const DARK_TEXT = "#FFFFFF";
  const LIGHT_TEXT = "#000000";
  const DARK_OVERLAY = "#222222";
  const LIGHT_OVERLAY = "#cccccc";

  const currentTheme = themeButton.textContent;

  if (currentTheme == DARK_MODE) {
    themeButton.textContent = LIGHT_MODE;
    document.documentElement.style.setProperty(
      "--background-color",
      LIGHT_BACKGROUND
    );
    document.documentElement.style.setProperty(
      "--overlay-color",
      LIGHT_OVERLAY
    );
    document.documentElement.style.setProperty("--text-color", LIGHT_TEXT);
  } else {
    themeButton.textContent = DARK_MODE;
    document.documentElement.style.setProperty(
      "--background-color",
      DARK_BACKGROUND
    );
    document.documentElement.style.setProperty("--overlay-color", DARK_OVERLAY);
    document.documentElement.style.setProperty("--text-color", DARK_TEXT);
  }
}

themeButton.addEventListener("click", handleThemeToggle);

// RANDOM BACKGROUND FUNCTIONALITY
const bgButton = document.querySelector("#bg-btn");
const main = document.querySelector("main");
const backgroundImagesDark = [
  "./assets/DARK_BG_1.png", 
  "./assets/DARK_BG_2.png", 
  "./assets/DARK_BG_3.jpg", 
  "./assets/DARK_BG_4.png", 
  "./assets/DARK_BG_5.png"
]

function showBackgroundImage() {
  const currentTheme = themeButton.textContent;
  if(currentTheme == DARK_MODE) {
    const randomNumber = Math.floor(Math.random() * backgroundImagesDark.length);
    main.style.backgroundImage = `url(${backgroundImagesDark[randomNumber]})`;
    main.style.backgroundSize = "cover";
  } else {
    const randomNumber = Math.floor(Math.random() * backgroundImagesDark.length);
    main.style.backgroundImage = `url(${backgroundImagesDark[randomNumber]})`;
    main.style.backgroundSize = "100%";
  }
}

bgButton.addEventListener("click", showBackgroundImage);