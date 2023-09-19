import * as yup from 'yup';

export const applyFormSchema = yup.object().shape({
    files: yup.mixed()
        .test('required', 'CV của bạn chưa được chọn', value => value && value.length)
        .test(
            "fileSize",
            "File đã hơn 100MB",
            value => value && value?.[0]?.size <= 104857600)
        .test(
            "fileFormat",
            "Định dạng file không được hỗ trợ",
            value => value && ["application/pdf", "image/jpg", "image/jpeg", "image/png", "text/plain"].includes(value?.[0]?.type)),
    note: yup.string().required('Mục này được yêu cầu').max(1000, 'Chỉ được 1000 kí tự')
})

export const storeFormSchema = yup.object().shape({
    //files: yup.string().required('Mục này được yêu cầu').max(1000),
    note: yup.string().required('Mục này được yêu cầu').max(1000, 'Chỉ được 1000 kí tự')
})