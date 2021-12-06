import { Button, Modal } from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import React from 'react';

import './index.less';

interface TextProps {
    desc: string;
    title?: string;
}

const TextModal = (porps: TextProps) => {
    const { desc, title } = porps;
    const [visible, setVisible] = React.useState(false);

    return (
        <div className="text-modal">
            <div className="text-modal-introduce" onClick={() => setVisible(true)}>
                {desc}
            </div>
            <Modal
                className="text-modal-visible"
                title={
                    <div className="text-modal-header">
                        <div className="text-modal-header-title">{title}</div>
                        <Button
                            className="text-modal-header-btn"
                            onClick={() => setVisible(false)}
                            icon={<IconClose style={{ margin:'auto'}} />}
                        />
                    </div>
                }
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                autoFocus={false}
                focusLock={true}
                simple
            >
                <div className="text-modal-content">
                    <p className="text-modal-content-description">{desc}</p>
                </div>
            </Modal>
        </div>
    );
};

export default TextModal;
