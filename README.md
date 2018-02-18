# grenade
An easy-to-use out-of-the-box rendering tool for Web

## Usage
- For a ```list``` data
```html
<script src="./grenade.js"></script>
<div id="test">
    <p class="g-node"></p>
    <input type="text" class="g-node">
</div>
```
```js
G.target('#test').throw([1,2])
```

- For an ```object``` data
```html
<script src="./grenade.js"></script>
<div id="test">
    <span class="g-node" g-key="name"></span>
    <img class="g-node" g-key="avatar">
</div>
```
```js
G.target('#test').throw({"name":"JerryLiao26", "avatar":"your.com/avatar.png"})
```

- For a ```list``` of ```object```
```html
<script src="./grenade.js"></script>
<div class="test">
    <span class="g-node" g-key="$index"></span>
    <p class="g-node" g-key="name"></p>
    <a class="g-node" g-key="link"></span>
</div>
```
```js
let data = [
    {"name": "JerryLiao26", "link": "github.com/JerryLiao26"},
    {"name": "John Doe", "link": "your.site/john_doe"}
]
G.target('.test').throw(data, true)
```

## Rendering Rules
- **Grenade** select elements through ```querySelectorAll()```, so if your selector selects multiple HTML elements with same class/id, all the elements would be rendered.
- If you're rendering a list with **grenade**, but you've got four **g-nodes** for only three elements in the list, the last **g-node** will be rendered by the first element.
- For different html tags, **grenade** use expection list to render. For example, ```<a>``` tag rendering targets ```href``` attribute, ```<input>```, ```<option>``` tag are ```value``` attribute, and ```src``` for ```<img>```, ```<video>```, ```<iframe>``` tags. Other tags will fill ```innerHTML```.
- Except for loop rendering, **grenade** don't change existing HTML nodes, that means re-render is quite easy.
