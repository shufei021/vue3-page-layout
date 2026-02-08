import { h, render, reactive } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import { t } from '../index.js'
export default function showCustomDialog(options = {}) {
  const {
    title = ' ',
    content = '',
    onClose,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    headerClass = 'custom-dialog-header',
    confirmType = 'primary', // 可选：'primary' | 'danger' 等
    width = '500px',
    showFooter=true,
  } = options
  const confirmTextFinal = typeof confirmText === 'string' ?  t(confirmText) : t('common.yes')
  const cancelTextFinal = typeof cancelText === 'string' ? t(cancelText) : t('common.no')

  const container = document.createElement('div')
  document.body.appendChild(container)

  const state = reactive({
    visible: true
  })

  const close = () => {
    if (!state.visible) return
    state.visible = false
    if (onClose) onClose()

    setTimeout(() => {
      render(null, container)
      document.body.removeChild(container)
    }, 300)
  }

  const handleConfirm = async () => {
    if (onConfirm)  await onConfirm(close)
    close()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    close()
  }
const defaultSlot = () => (typeof content === 'string' ? h('div', { innerHTML: content }) : content)
const header = ({ titleId, titleClass }) =>
  h(
    'div',
    {
      class: 'custom-header',
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
    [
      h('h6', {
        id: titleId,
        class: titleClass || 'custom-dialog-title',
        style: {
          fontSize: '15px',
          fontWeight: '500',
          color: '#1A1A1A',
          margin: '0',
        },
      }, title || ' '),
      h(CloseBold, {
        onClick: close,
        style: {
          cursor: 'pointer',
          width: '14px',
          height: '14px',
          color: '#A4AFCA',
        },
      }),
    ] 
  )
const  footer = () =>
  h('div', {
    style: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
    },
  }, [
    h(
      ElButton,
      {
        onClick: handleCancel,
          style: {
          borderRadius:'8px!important'
        },
      },
      { default: () => cancelTextFinal }
    ),
    h(
      ElButton,
      {
        type: confirmType, // 例如 'primary' 或 'danger'
        onClick: handleConfirm,
        style: {
          borderRadius:'8px!important'
        },
      },
      { default: () => confirmTextFinal }  
    ),
  ])            
  const DialogComponent = {
    setup() {
      return () =>
        h(
          ElDialog,
          {
            modelValue: state.visible,
            'onUpdate:modelValue': (val) => {
              if (!val) close()
            },
            width,
            'show-close': false,
            destroyOnClose: true,
            center: true,
            headerClass,
            'close-on-click-modal': false
          },
          {
            default: defaultSlot,
            header,
            footer: showFooter?footer:null
          }
        )
    }
  }

  render(h(DialogComponent), container)

  return { close }
}