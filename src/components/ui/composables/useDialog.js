import  showCustomDialog  from './useCustomDialog'
import { h } from 'vue'
export default function useDialog({title,content,onConfirm,onCancel,confirmText,cancelText,headerClass,width,showFooter}) {
    showCustomDialog({
      title,
      content: typeof content === 'function' ? content(h) : content,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      headerClass,
      width,
      showFooter
    })
}