const formatDate = (date, hour) => {
    const result = !hour ? `${new Date(date).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${new Date(date).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit' })}` : `${new Date(date).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}`
    return result
}
export default formatDate