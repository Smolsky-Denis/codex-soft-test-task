import React from 'react';
import Title from "./componets/Title/Title";
import Input from "./componets/Input/Input";
import Paragraph from "./componets/Paragraph/Paragraph";
import Button from "./componets/Button/Button";


export let MapDataToFormElementsService = {
    elementTypeList: {
        title: function (item) {
            return <Title key={item.id} data={item}/>
        },
        input: function (item) {
            return <Input key={item.id} data={item}/>
        },
        button: function (item) {
            return <Button key={item.id} data={item}/>
        },
        paragraph: function (item) {
            return <Paragraph key={item.id} data={item}/>
        },
    },
    getElementFormService: function (pageFields) {
        return pageFields && pageFields.map((item) => this.elementTypeList[item.element](item));
    }
};
let changeCanvas = (xStart, xEnd, element) => {
    let xDiff = Math.abs(xEnd - xStart),
        lineLength = xDiff + 1;
    let line = 'x'.repeat(lineLength).split('');
    let elementArray = element.split('');
    elementArray.splice(xStart < xEnd ? xStart : xEnd, lineLength, ...line);
    return elementArray.join('');
};

let canvas = (command) => {
    let result = [];
    let count = +command[2];
    result.push('-'.repeat(+command[1]));
    while (count) {
        result.push('|' + ' '.repeat(+command[1] - 2) + '|');
        count--;
    }
    result.push('-'.repeat(+command[1]));
    return result;
};

let line = (command, canvasCurrentResult) => {
    let xStart = +command[1];
    let yStart = +command[2];
    let xEnd = +command[3];
    let yEnd = +command[4];
    return canvasCurrentResult.map((item, index) => {
        return (index < yStart || index > yEnd) ? item : changeCanvas(xStart, xEnd, item);
    });
};

let rectangle = (command, canvasResult) => {
    let xTopLeft = command[1];
    let yTopLeft = command[2];
    let xTopRight = command[3];
    let yTopRight = command[2];
    let xBottomLeft = command[1];
    let yBottomLeft = command[4];
    let xBottomRight = command[3];
    let yBottomRight = command[4];

    let arrSideRectangle = [
        ['L', xTopLeft, yTopLeft, xTopRight, yTopRight],
        ['L', xTopRight, yTopRight, xBottomRight, yBottomRight],
        ['L', xBottomLeft, yBottomLeft, xBottomRight, yBottomRight],
        ['L', xTopLeft, yTopLeft, xBottomLeft, yBottomLeft]
    ];

    let tempCanvas = [...canvasResult];

    arrSideRectangle.forEach((item) => {
        tempCanvas = line(item, tempCanvas);
    });

    return tempCanvas;
};

export let verificationCommand = {
    zeroElementList: {
        C: function (command) {
            return canvas(command)
        },
        L: function (command, canvasResult) {
            return line(command, canvasResult)
        },
        R: function (command) {
            return rectangle(command)
        }
    },
    identifyCommand: function (command, canvasResult) {
        return command && command[0] && this.zeroElementList[command[0]] && this.zeroElementList[command[0]](command, canvasResult);
    }
};
