import "./styles.css";

const paragraph =
  "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50.";

const findOccurences = (str, searchStr) => {
  let count = 0;
  let position = str.indexOf(searchStr);

  while (position !== -1) {
    count++;
    position = str.indexOf(searchStr, position + 1);
  }
  return count;
};

// 128 - 32 = 96, 32 first characters are garbage :)
const charSet = Array(96)
  .fill()
  .map((_, idx) => 32 + idx)
  .map(val => String.fromCharCode(val));

const uniqueCharset = Array.from(new Set(charSet));

const charWithOccuerences = uniqueCharset.map(uniqueChar => {
  const nrOfHits = findOccurences(paragraph, uniqueChar);
  return { c: uniqueChar, value: nrOfHits };
});

// Sort array based on number of occurences
charWithOccuerences.sort((a, b) => a.value - b.value);

const totalAllowedOccurences = paragraph.length - 50;

let counter = 0;
let nrOfOccs = 0;
const charOutput = [];
while (nrOfOccs < totalAllowedOccurences) {
  const { c, value } = charWithOccuerences[counter];
  //console.log("nrOfOccs: ", nrOfOccs, "char: ", c, "value: ", value);
  nrOfOccs += value;
  charOutput.push(c);
  counter++;
}

document.getElementById("app").innerHTML = `
<h1>Spotify Anchor</h1>
<p>
  ${paragraph}
</p>
<p>
  Paragraph length: ${paragraph.length}
</p>
<p>
  Total allowed occurences: ${totalAllowedOccurences}
</p>
<div>
 Output: ${charOutput}
</div>
`;
