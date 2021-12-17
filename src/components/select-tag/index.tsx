import { Button, Tag } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import { useState } from 'react';

import './index.less';

interface SelectTagProps {
    options: string[];
}

const SelectTag = (props: SelectTagProps) => {
    const { options } = props;
    const [value, setValue] = useState(options[0]);
    const [showOpt, setShowOpt] = useState(false);
    return (
        <div className="select-tag">
            <Tag checkable className="select" color="gray">
                <span>{value}</span>
                <Button
                    className="drown-btn"
                    icon={<IconDown />}
                    onClick={() => {
                        setShowOpt(!showOpt);
                    }}
                />
            </Tag>
            <div className={classNames(showOpt ? 'opt-drown' : 'none')}>
                <div className="menu">
                    {options.map((item, index) => {
                        return (
                            <div
                                className="item"
                                key={index}
                                onClick={() => {
                                    setValue(item);
                                    setShowOpt(false);
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectTag;
