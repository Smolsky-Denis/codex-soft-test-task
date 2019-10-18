import React, {useState} from 'react';
import {MapDataToFormElementsService, verificationCommand} from "./utils";

function App() {

    const [canvasResult, setCanvasResult] = useState([]);

    let clearInput = () => {
        document.querySelector("input").value = null;
    };

    let getInputValue = () => {
        return document.querySelector("input").value;
    };

    let handleClick = () => {
        let input = getInputValue().toUpperCase();
        let command = input.split(' ');
        if(canvasResult.length || command[0] === 'C') {
            setCanvasResult(command && command.length > 2
                ? verificationCommand.identifyCommand(command, canvasResult)
                : null);
        } else {
            alert('Создайте canvas командой С')
        }
        clearInput();
    };

    let onKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    let pageFields = [
        {
            id: 0,
            element: 'title',
            text: 'Тестовое задание для Codex Soft',
            sizeFont: 'h3',
            className: 'col-md-12 titleMargin',
        }, {
            id: 1,
            element: 'input',
            buttonType: 'button',
            placeholder: 'Введите команду',
            type: 'text',
            className: 'col-md-12',
            onKeyPress: (event)=> onKeyPress(event)
        }, {
            id: 2,
            element: 'button',
            onClick: () => handleClick(),
            name: 'Выполнить',
            className: 'col-md-12 buttonMargin',
            classNameButton: 'btn btn-primary'
        }, {
            id: 3,
            element: 'paragraph',
            showResult: () => canvasResult
        }
    ];
    let result = MapDataToFormElementsService.getElementFormService(pageFields);
    return (
        <div className="container">
                <div className="row justify-content-md-center">
                {result}
            </div>
        </div>
    );
}

export default App;
