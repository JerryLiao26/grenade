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
