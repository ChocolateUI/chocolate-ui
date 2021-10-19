import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import Modal, { ModalProps } from "./modal";
import Button from "../Button";
import ModalDoc from "./modal-doc.mdx";
import Card from "../Card/card";

const BaseModal = () => {
  const commonCss = { fontSize: 13, marginBottom: 20 };
  const cardCss = { margin: "20px 20px 0 0" };
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [greyBg, setGreyBg] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [closed, setClosed] = useState(false);

  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  return (
    <div style={{ display: "flex", width: 888, flexWrap: "wrap" }}>
      <Card title="蒙层" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible}
          showMask={greyBg}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <div style={commonCss}>你可以选择是否展示模态框背后的蒙层</div>
        <Button
          onClick={() => {
            setVisible(true);
            setGreyBg(false);
          }}
        >
          没有蒙层
        </Button>
        <Button
          btnType="primary"
          style={{ marginLeft: 20 }}
          onClick={() => {
            setVisible(true);
            setGreyBg(true);
          }}
        >
          有蒙层
        </Button>
      </Card>
      <Card title="蒙层关闭" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible3}
          showMask
          maskClosable={true}
          onOk={() => setVisible3(false)}
          onCancel={() => setVisible3(false)}
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <div style={commonCss}>你可以点击蒙层关闭模态框</div>
        <Button btnType="primary" onClick={() => setVisible3(true)}>
          show
        </Button>
      </Card>
      <Card title="关闭按钮" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible4}
          showMask
          closable={closed}
          onCancel={() => setVisible4(false)}
          onOk={() => setVisible4(false)}
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <div style={commonCss}>你可以控制模态框右上角的关闭按钮</div>
        <Button
          onClick={() => {
            setVisible4(true);
            setClosed(false);
          }}
        >
          不展示
        </Button>
        <Button
          btnType="primary"
          style={{ marginLeft: 20 }}
          onClick={() => {
            setVisible4(true);
            setClosed(true);
          }}
        >
          展示
        </Button>
      </Card>
      <Card title="Icon" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible5}
          showMask
          closable={false}
          icon="crow"
          onCancel={() => setVisible5(false)}
          onOk={() => setVisible5(false)}
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <div style={commonCss}>在 Title 上设置喜欢的 Icon 图标</div>
        <Button btnType="primary" onClick={() => setVisible5(true)}>
          有图标的
        </Button>
      </Card>
      <Card title="Icon 主题" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible6}
          showMask
          onCancel={() => setVisible6(false)}
          onOk={() => setVisible6(false)}
          icon="crow"
          theme="primary"
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <div style={commonCss}>可以在 Title 上为 Icon 图标设置喜欢的主题 </div>
        <Button btnType="primary" onClick={() => setVisible6(true)}>
          设置图标主题
        </Button>
      </Card>

      <Card title="自定义 Footer" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible7}
          maskClosable={false}
          onCancel={() => setVisible7(false)}
          footer={
            <>
              <Button
                btnType="danger"
                size="sm"
                onClick={() => setVisible7(false)}
              >
                cancel
              </Button>
              <Button
                btnType="default"
                style={{ marginLeft: 16 }}
                onClick={() => setVisible7(false)}
                size="sm"
              >
                ok
              </Button>
            </>
          }
        >
          <div>确认一下</div>
          <span style={{ color: "#999999", fontSize: 12 }}>
            是否要关闭模态框？
          </span>
        </Modal>
        <div style={commonCss}>
          当需要当默认 Footer 不满足需要的时候，你可以自己设计 Footer
        </div>
        <Button btnType="primary" onClick={() => setVisible7(true)}>
          自定义 Footer
        </Button>
      </Card>

      <Card title="自定义馈按钮文案" style={cardCss} shadow>
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
        <div style={commonCss}>在默认 Footer 中，设置反馈按钮的文案</div>
        <Button btnType="primary" onClick={() => setVisible8(true)}>
          show
        </Button>
      </Card>
      <Card title="模态框宽度" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible9}
          maskClosable={false}
          onOk={() => setVisible9(false)}
          onCancel={() => setVisible9(false)}
          width={555}
          content="确认一下"
        />
        <div style={commonCss}>单独设置模态框宽度</div>
        <Button btnType="primary" onClick={() => setVisible9(true)}>
          show
        </Button>
      </Card>
      <Card title="居中展示" style={cardCss} shadow>
        <Modal
          title="提示"
          visible={visible2}
          maskClosable={false}
          centered
          onOk={() => setVisible2(false)}
          onCancel={() => setVisible2(false)}
          width={555}
          content="确认一下"
        />
        <div style={commonCss}>你可以让模态框居中展示</div>
        <Button btnType="primary" onClick={() => setVisible2(true)}>
          居中
        </Button>
      </Card>
    </div>
  );
};

export default {
  component: Modal,
  title: "Modal 模态框",
  parameters: {
    docs: {
      page: ModalDoc,
      source: {
        type: "code",
      },
    },
  },
} as Meta;

const _default: Story<ModalProps> = () => <BaseModal />;

// 默认
export const Primary = _default.bind({});

Primary.args = {};
