import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import Modal, { ModalProps } from "./modal";
import Button from "../Button";
import ModalDoc from "./modal-doc.mdx";

const BaseModal = (props: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);

  return (
    <>
      <div>
        <Modal
          title="提示"
          visible={visible}
          showMask={false}
          onCancel={() => setVisible(false)}
          footer={
            <>
              <Button
                btnType="default"
                size="sm"
                onClick={() => setVisible(false)}
              >
                取消
              </Button>
              <Button
                btnType="primary"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible(false)}
                size="sm"
              >
                确认
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible(true)}>不带蒙层的模态框</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible2}
          showMask={true}
          onCancel={() => setVisible2(false)}
          footer={
            <>
              <Button
                btnType="default"
                size="sm"
                onClick={() => setVisible2(false)}
              >
                取消
              </Button>
              <Button
                btnType="primary"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible2(false)}
                size="sm"
              >
                确认
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible2(true)}>带有蒙层的模态框</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible3}
          showMask
          maskClosable={false}
          onCancel={() => setVisible3(false)}
          footer={
            <>
              <Button
                btnType="default"
                size="sm"
                onClick={() => setVisible3(false)}
              >
                取消
              </Button>
              <Button
                btnType="primary"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible3(false)}
                size="sm"
              >
                确认
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible3(true)}>
          蒙层点击不会关闭模态框
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible4}
          showMask
          closable={false}
          onCancel={() => setVisible4(false)}
          footer={
            <>
              <Button
                btnType="default"
                size="sm"
                onClick={() => setVisible4(false)}
              >
                取消
              </Button>
              <Button
                btnType="primary"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible4(false)}
                size="sm"
              >
                确认
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible4(true)}>不展示关闭按钮</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible5}
          showMask
          closable={false}
          onCancel={() => setVisible5(false)}
          icon="crow"
          footer={
            <>
              <Button
                btnType="default"
                size="sm"
                onClick={() => setVisible5(false)}
              >
                取消
              </Button>
              <Button
                btnType="primary"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible5(false)}
                size="sm"
              >
                确认
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible5(true)}>有图标的</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible6}
          showMask
          onCancel={() => setVisible6(false)}
          icon="crow"
          theme="primary"
          footer={
            <>
              <Button
                btnType="default"
                size="sm"
                onClick={() => setVisible6(false)}
              >
                取消
              </Button>
              <Button
                btnType="primary"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible6(false)}
                size="sm"
              >
                确认
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible6(true)}>设置图标主题</Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible7}
          maskClosable={false}
          onOk={() => setVisible7(false)}
          onCancel={() => setVisible7(false)}
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible7(true)}>默认 footer </Button>
      </div>

      <div style={{ marginTop: 20 }}>
        <Modal
          title="确认提示"
          visible={visible8}
          maskClosable={false}
          onOk={() => setVisible8(false)}
          onCancel={() => setVisible8(false)}
          okText="好的"
          cancelText="我拒绝"
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <Button onClick={() => setVisible8(true)}>
          设置默认 footer 按钮文案{" "}
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Modal
          title="提示"
          visible={visible9}
          maskClosable={false}
          onOk={() => setVisible9(false)}
          onCancel={() => setVisible9(false)}
          okText="好的"
          cancelText="我拒绝"
          width={555}
          content="确认一下"
        />
        <Button onClick={() => setVisible9(true)}>单独设置宽度</Button>
      </div>
    </>
  );
};

export default {
  component: Modal,
  title: "Modal",
  parameters: {
    docs: {
      page: ModalDoc,
      source: {
        type: "code",
      },
    },
  },
} as Meta;

const _default: Story<ModalProps> = (args) => <BaseModal {...args} />;

// 默认
export const Default = _default.bind({});

Default.args = {};
