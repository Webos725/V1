(function (global) {
    const oscreate = {};

    // ウィンドウを作成する関数
    oscreate.createWindow = function (id, options = {}) {
        const windowElement = document.createElement('div');
        windowElement.classList.add('os-window');
        windowElement.id = id || 'window-' + Date.now();

        const header = document.createElement('div');
        header.classList.add('os-window-header');
        header.textContent = options.title || '新しいウィンドウ';

        const closeButton = document.createElement('span');
        closeButton.textContent = '╳';
        closeButton.classList.add('os-close-button');
        closeButton.addEventListener('click', function () {
            windowElement.remove();
        });

        const minimizeButton = document.createElement('span');
        minimizeButton.textContent = '_';
        minimizeButton.classList.add('os-minimize-button');
        minimizeButton.addEventListener('click', function () {
            windowElement.classList.toggle('os-minimized');
        });

        const maximizeButton = document.createElement('span');
        maximizeButton.textContent = '□';
        maximizeButton.classList.add('os-maximize-button');
        maximizeButton.addEventListener('click', function () {
            windowElement.classList.toggle('os-maximized');
        });

        header.appendChild(closeButton);
        header.appendChild(minimizeButton);
        header.appendChild(maximizeButton);

        const content = document.createElement('div');
        content.classList.add('os-window-content');
        content.innerHTML = options.content || 'コンテンツなし';

        windowElement.appendChild(header);
        windowElement.appendChild(content);
        document.body.appendChild(windowElement);

        oscreate.addDragFunctionality(windowElement, header);

        return windowElement;
    };

    // ドラッグ機能を追加する関数
    oscreate.addDragFunctionality = function (element, header) {
        let isDragging = false;
        let offsetX, offsetY;

        const startDrag = (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
        };

        const drag = (e) => {
            if (isDragging) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
            }
        };

        const stopDrag = () => {
            isDragging = false;
        };

        header.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        // タッチ対応
        header.addEventListener('touchstart', (e) => {
            e.preventDefault();  // スクロールを防ぐ
            startDrag(e.touches[0]);
        });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            drag(e.touches[0]);
        });

        document.addEventListener('touchend', stopDrag);
    };

    // エクスプローラーに項目を自由に指定して追加する関数
    oscreate.createExplorerMenu = function (container, menuItems = []) {
        const menu = document.createElement('div');
        menu.classList.add('os-explorer-menu');

        menuItems.forEach(item => {
            const button = document.createElement('button');
            button.textContent = item.label;

            button.addEventListener('click', item.action);

            menu.appendChild(button);
        });

        container.appendChild(menu);
    };

    // ファイルアイコンを作成する関数
    oscreate.createFileIcon = function (name, container) {
        const fileIcon = document.createElement('div');
        fileIcon.classList.add('os-file-icon');
        fileIcon.textContent = name;

        // ドラッグ機能を追加
        oscreate.addDragFunctionality(fileIcon, fileIcon);

        container.appendChild(fileIcon);
    };

    // グローバルにライブラリを公開
    global.oscreate = oscreate;

})(this);
