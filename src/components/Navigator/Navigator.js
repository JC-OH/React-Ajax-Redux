import React from 'react';
import {Button} from 'semantic-ui-react';
import './Navigator.css'

const Navigator = ({onClick, articleId, disabled}) => (
    <div className="Navigate">
        <Button
            color="teal"
            content="Previous"
            icon="left arrow"
            labelPosition="left"
            disabled={disabled}
            onClick={
                    () => onClick('PREV')
            }
        />
        <div className="Navigate-page-num">
            {articleId}
        </div>
        <Button
            color="teal"
            content="Next"
            icon="right arrow"
            labelPosition="right"
            className="Navigate-right-button"
            disabled={disabled}
            onClick={
                    () => onClick('NEXT')
            }
        />
    </div>
)

export default Navigator;
