import useDialog from './useDialog'
export default ({
    title = ' ',
    confirmText,
    cancelText,
    onConfirm,
    content,
    onCancel,
    headerClass,
    width,
    showFooter
}) => {
    useDialog({
        title,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
        headerClass,
        width,
        showFooter,
        content(h) {
            return h('div', {
                style: {
                    lineHeight: '20px'
                }
            }, [
                // h('div', {
                //     style: {
                //         color: '#303133',
                //         padding: '10px 0'
                //     }
                // }, ''),
                ...(typeof content === 'function' ? [content(h)] :[h('div', {
                    style: {
                        color: '#606266',
                        // lineHeight: '22px',
                        // padding: '10px 0',
                        // fontSize: '13px',
                        paddingTop: '10px',
                        whiteSpace: 'pre-line', // 保留换行符并自动换行
                        wordBreak: 'break-word',
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Switzer-Regular",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "22px"
                        
                    }
                }, content)] )
                
            ])
        }
    })
}