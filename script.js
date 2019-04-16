const dataCtrl = (function () {
    const X = (startPos, endPos) => {
        this.startPos = startPos;
        this.endPos = endPos;
    }
    /*
    Line.prototype.DOMMen = () => {
        //do some dom menipulations
    }
    */
   let setBox = place => {

    switch (place) {
        case 0:
            return 0;
        case 1:
            return 1/3;
        case 2:
            return 2/3;
        case 3:
            return 1;    
    }
}

    const startDrawing = [];
    const toDrawing = [];

    return {
        boardDrawingSquare: (width, height) => {
            let squares = {};

            //ctx.strokeRect(x, y, width, height);
            //start points(xy) width height(xy)
            //1//[0, 0, 1/3, 1/3]      //[1/3, 0, 2/3, 1/3]     //[2/3, 0, 1, 1/3]
            //2//[0, 1/3, 1/3, 2/3]    //[1/3, 1/3, 2/3, 2/3]   //[2/3, 1/3, 1, 2/3]
            //3//[0, 2/3, 1/3, 1]      //[1/3, 2/3, 2/3, 1]     //[2/3, 2/3, 1, 1]
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let cur = `box${i}${j}`;
                    squares[cur] = [
                        (setBox(j) * width),
                        (setBox(i) * height),
                        (setBox(j + 1) * width),
                        (setBox(i + 1) * height),
                    ];
                }
            }
            return squares;
        },

        setSquareClicked: (x, y, boxes) => {
            //console.log(x, y, boxes);
            for (cur of Object.keys(boxes)) {
                if (x > boxes[cur][0] && x < boxes[cur][2]) {
                    if (y > boxes[cur][1] && y < boxes[cur][3]) {
                        return cur;
                    }
                }
            }            
        },

        boardDrawing: (width, height) => {
            let boardOver, boardCrorss, maxSize, drawingLines;

            boardOver = [width / 3, 0, (width * 2 / 3), 0];
            boardCrorss = [0, height / 3, 0, (height * 2 / 3)];
            maxSize = [width, height];
            drawingLines = { boardOver, boardCrorss, maxSize };

            return drawingLines;
        },
    }

})();




const UICtrl = (function () {

    return {

        elements: {
            canvas: `canvas`,
            canvasSelectorMaxX: document.querySelector('.canvas').width,
            canvasSelectorMaxY: document.querySelector('.canvas').height,
            canvasSelectorOffsetX: document.querySelector('.canvas').offsetWidth,
            canvasSelectorOffsetY: document.querySelector('.canvas').offsetHeight,
        },

        drawBoard: (obj) => {
            let board = document.querySelector(`.${UICtrl.elements.canvas}`).getContext(`2d`);

            for (let i = 0; i < obj.boardCrorss.length; i += 2) {
                board.moveTo(obj.boardCrorss[i], obj.boardCrorss[i + 1]);
                board.lineTo(obj.maxSize[0], obj.boardCrorss[i + 1]);
                board.lineWidth = 1;
                board.stroke();
            };
            for (let i = 0; i < obj.boardOver.length; i += 2) {
                board.moveTo(obj.boardOver[i], obj.boardOver[i + 1]);
                board.lineTo(obj.boardOver[i], obj.maxSize[1]);
                board.lineWidth = 1;
                board.stroke();
            }
        },
        drawNewBoard: (obj) => {
            let board = document.querySelector(`.${UICtrl.elements.canvas}`).getContext(`2d`);
            for (cur of Object.keys(obj)) {
                board.strokeRect(obj[cur][0], obj[cur][1], obj[cur][2], obj[cur][3]);
                board.stroke();
            }
        }
    }
})();




const controller = (function () {
    //get canvas width
    console.log(document.querySelector(".canvas"))

    //save object with mesurments for lines
    //old way: (draw lines)
    //let lineCords = dataCtrl.boardDrawing(document.querySelector(`.${UICtrl.elements.canvas}`).width, document.querySelector(`.${UICtrl.elements.canvas}`).height);
    //new way: (draw boxes)
    let boardBoxes = dataCtrl.boardDrawingSquare(UICtrl.elements.canvasSelectorMaxX, UICtrl.elements.canvasSelectorMaxY);
    //console.log(document.querySelector(".canvas"));
    
    //console.log(Object.keys(boardBoxes));
    UICtrl.drawNewBoard(boardBoxes);
    //make a board
    var testDom = document.querySelector(`.${UICtrl.elements.canvas}`);
    testDom.addEventListener('click', (event) => {
        //console.log(event);
        let boxes = dataCtrl.boardDrawingSquare(UICtrl.elements.canvasSelectorOffsetX, UICtrl.elements.canvasSelectorOffsetY);
        //event.layerX, event.layerY = pressed on object
        let selected = dataCtrl.setSquareClicked(event.layerX, event.layerY, boxes);
        console.log(selected);
        
    });
    
    
    //draw a board

    //set up evenListeners
    let setupEventListeners = () => {

    }

    //Draw X or O

    //Pass turn and check win condition

    //update score

    //update UI

})();


(function init() { 
    //zero the score, draw clean board
})();



