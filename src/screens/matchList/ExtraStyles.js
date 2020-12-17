import templateLiteralsParser from "../../util/templateLiteralsParser";

function getBackgroundColor(isDraggingOver, isAnswerCorrect) {
    if (isDraggingOver) {
        return 'skyblue';
    } else if (isAnswerCorrect != null) {
        if (isAnswerCorrect) {
            return 'lightgreen';
        }
        return '#FF9999';
    }

    return 'white';
};

const optionExtraStyles = templateLiteralsParser`
    display: flex;

    margin-right: 16px;
    padding: 12px;
    
    flex: 1 1 150px;

    &[style] {
        width: ${props => (props.isDragging && props.draggingOver !== 'optionsDroppable') ? `${props.answerItemWidth}px !important` : 'auto'};
    }
`;

const optionsDroppable = templateLiteralsParser`
    display: flex;
    justify-content: space-between;
    background-color: ${props => getBackgroundColor(props.isDraggingOver, props.isAnswerCorrect)};
    padding: 12px;
    min-height: 50px;
`;

const optionsListExtraStyles = templateLiteralsParser`
    display: flex;
    justify-content: space-between;
    background-color: ${props => getBackgroundColor(props.isDraggingOver, props.isAnswerCorrect)};
    padding: 8px 0 8px 12px;
    min-height: 50px;
`;

export default {
    OPTION: optionExtraStyles,
    OPTIONS_DROPPABLE: optionsDroppable,
    OPTIONS_LIST: optionsListExtraStyles
};