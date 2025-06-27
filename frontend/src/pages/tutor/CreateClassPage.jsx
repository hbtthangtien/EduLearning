import React, { useState, useRef } from 'react';
import { FaArrowRight, FaArrowLeft, FaSave, FaFileImage } from 'react-icons/fa';
import { useUserId } from '../../hooks/useUserId';
const CreateClassPage = () => {
    const [step, setStep] = useState(1);
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        pricePerSession: '',
        minPricePerSession: '',
        numberOfSessions: 1,
        sessionDuration: '',
        frontImage: null,
        backImage: null,
    });
    const { id } = useUserId();
    const [preview, setPreview] = useState({ front: '', back: '' });
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [touched, setTouched] = useState({});
    const fileFrontRef = useRef();
    const fileBackRef = useRef();

    // Validate cho từng bước
    const validate = (data, currentStep, contentsArr = []) => {
        const err = {};
        if (currentStep === 1) {
            if (!data.title?.trim()) err.title = "Nhập tiêu đề khóa học";
            if (!data.description?.trim()) err.description = "Nhập mô tả cho khóa học";
            if (!data.pricePerSession || Number(data.pricePerSession) <= 0)
                err.pricePerSession = "Nhập giá mỗi buổi học (>0)";
            if (data.minPricePerSession === '' || Number(data.minPricePerSession) < 0)
                err.minPricePerSession = "Nhập giá trị tối thiểu (>=0)";
            if (!data.numberOfSessions || Number(data.numberOfSessions) <= 0)
                err.numberOfSessions = "Nhập số buổi (>0)";
            if (!data.sessionDuration || Number(data.sessionDuration) <= 0)
                err.sessionDuration = "Nhập thời lượng mỗi buổi (>0)";
            if (!data.frontImage) err.frontImage = "Vui lòng chọn ảnh mặt trước";
            if (!data.backImage) err.backImage = "Vui lòng chọn ảnh mặt sau";

        }
        if (currentStep === 2) {
            if (!contentsArr || contentsArr.length === 0)
                err.contents = "Vui lòng nhập nội dung cho từng buổi";
            contentsArr.forEach((c, i) => {
                if (!c?.trim()) {
                    if (!err.contentsDetail) err.contentsDetail = {};
                    err.contentsDetail[i] = `Nhập nội dung buổi ${i + 1}`;
                }
            });
        }
        return err;
    };

    const handleCourseChange = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setCourseData(prev => ({ ...prev, [name]: file }));
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(prev => ({ ...prev, [name === 'frontImage' ? 'front' : 'back']: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setCourseData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleContentChange = (index, value) => {
        const updated = [...contents];
        updated[index] = value;
        setContents(updated);
    };

    // Step 1: Validate all, setTouched all, tiếp tục nếu ok
    const handleContinue = () => {
        const err = validate(courseData, 1);
        setError(err);
        setTouched({
            title: true,
            pricePerSession: true,
            minPricePerSession: true,
            numberOfSessions: true,
            description: true,
            sessionDuration: true,
            frontImage: true,
            backImage: true,
        });
        if (Object.keys(err).length === 0) {
            const count = parseInt(courseData.numberOfSessions) || 1;
            setContents(Array(count).fill(''));
            setStep(2);
        }
    };

    // Step 2: Validate content
    const handleSubmit = async () => {
        const err = validate(courseData, 2, contents);
        // setTouched cho từng content textarea (dùng key 'content0', 'content1', ...)
        let contentTouched = {};
        if (contents.length > 0) {
            contents.forEach((_, i) => {
                contentTouched[`content${i}`] = true;
            });
        }
        setTouched(t => ({ ...t, ...contentTouched }));
        setError(err);
        if (Object.keys(err).length === 0) {
            setLoading(true);
            const formData = new FormData();

            formData.append('Title', courseData.title);
            formData.append('PricePerSession', courseData.pricePerSession);
            formData.append('NumberOfSession', courseData.numberOfSessions);
            const minutes = Number(courseData.sessionDuration) || 0;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            const timeSpanString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;

            // Lúc append FormData:
            formData.append('DurationSession', timeSpanString);
            formData.append('Description', courseData.description);

            const listContent = contents.map((desc, idx) => ({
                CourseId: 0,
                Descriptions: desc,
                ContentType: 'BASIC'
            }));
            formData.append('ListContentJson', JSON.stringify(listContent));

            // Ảnh
            if (courseData.frontImage) formData.append('FrontImage', courseData.frontImage);
            if (courseData.backImage) formData.append('BackImage', courseData.backImage);
            try {
                // Gửi API (thay url thật của bạn)
                const res = await fetch(`https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/tutors/${id}/courses`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error('Lỗi khi gửi dữ liệu lên server');

                alert('Đã tạo khoá học thành công!');
                
            } catch (err) {
                alert('Có lỗi: ' + err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-md">
            <div className="text-sm text-gray-500 font-semibold">Step {step} of 2</div>
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <h2 className="text-2xl font-bold">Tạo khóa học mới</h2>
                    {/* Tiêu đề khóa học */}
                    <input
                        type="text"
                        name="title"
                        value={courseData.title}
                        onChange={handleCourseChange}
                        onBlur={() => setTouched(t => ({ ...t, title: true }))}
                        placeholder="Tiêu đề khóa học"
                        className={`w-full border p-2 rounded ${error.title && touched.title ? 'border-red-400 bg-red-50' : ''}`}
                    />
                    {error.title && touched.title && (
                        <div className="text-red-500 text-xs mt-1">{error.title}</div>
                    )}
                    {/* Mô tả khóa học */}
                    <input
                        type="text"
                        name="description"
                        value={courseData.description}
                        onChange={handleCourseChange}
                        onBlur={() => setTouched(t => ({ ...t, description: true }))}
                        placeholder="Mô tả khóa học"
                        className={`w-full border p-2 rounded ${error.description && touched.description ? 'border-red-400 bg-red-50' : ''}`}
                    />
                    {error.title && touched.title && (
                        <div className="text-red-500 text-xs mt-1">{error.description}</div>
                    )}
                    {/* Giá và giá min */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <input
                                type="number"
                                name="pricePerSession"
                                value={courseData.pricePerSession}
                                onChange={handleCourseChange}
                                onBlur={() => setTouched(t => ({ ...t, pricePerSession: true }))}
                                placeholder="Giá cho mỗi buổi học (₫)"
                                className={`w-full border p-2 rounded ${error.pricePerSession && touched.pricePerSession ? 'border-red-400 bg-red-50' : ''}`}
                            />
                            {error.pricePerSession && touched.pricePerSession && (
                                <div className="text-red-500 text-xs mt-1">{error.pricePerSession}</div>
                            )}
                        </div>
                        <div className="w-full">
                            <input
                                type="number"
                                name="minPricePerSession"
                                value={courseData.minPricePerSession}
                                onChange={handleCourseChange}
                                onBlur={() => setTouched(t => ({ ...t, minPricePerSession: true }))}
                                placeholder="Giá trị thấp nhất có thể giảm"
                                className={`w-full border p-2 rounded ${error.minPricePerSession && touched.minPricePerSession ? 'border-red-400 bg-red-50' : ''}`}
                            />
                            {error.minPricePerSession && touched.minPricePerSession && (
                                <div className="text-red-500 text-xs mt-1">{error.minPricePerSession}</div>
                            )}
                        </div>
                    </div>

                    {/* Số buổi học */}
                    <input
                        type="number"
                        name="numberOfSessions"
                        value={courseData.numberOfSessions}
                        onChange={handleCourseChange}
                        onBlur={() => setTouched(t => ({ ...t, numberOfSessions: true }))}
                        placeholder="Số lượng buổi học"
                        className={`w-full border p-2 rounded ${error.numberOfSessions && touched.numberOfSessions ? 'border-red-400 bg-red-50' : ''}`}
                    />
                    {error.numberOfSessions && touched.numberOfSessions && (
                        <div className="text-red-500 text-xs mt-1">{error.numberOfSessions}</div>
                    )}

                    {/* Thời lượng */}
                    <input
                        type="number"
                        name="sessionDuration"
                        value={courseData.sessionDuration}
                        onChange={handleCourseChange}
                        onBlur={() => setTouched(t => ({ ...t, sessionDuration: true }))}
                        placeholder="Thời gian mỗi buổi học (phút)"
                        className={`w-full border p-2 rounded mt-3 ${error.sessionDuration && touched.sessionDuration ? 'border-red-400 bg-red-50' : ''}`}
                    />
                    {error.sessionDuration && touched.sessionDuration && (
                        <div className="text-red-500 text-xs mt-1">{error.sessionDuration}</div>
                    )}

                    {/* Ảnh mặt trước và sau */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Mặt trước chứng chỉ</label>
                            <div className={`border rounded-lg p-2 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 ${error.frontImage && touched.frontImage ? 'border-red-400 bg-red-50' : ''}`} onClick={() => fileFrontRef.current.click()}>
                                {preview.front ? <img src={preview.front} alt="Front Preview" className="h-32 mx-auto" /> : <FaFileImage className="mx-auto text-gray-400 text-3xl" />}<div>Bấm vào đây để tải ảnh</div>
                            </div>
                            <input type="file" name="frontImage" ref={fileFrontRef} onChange={handleCourseChange} onBlur={() => setTouched(t => ({ ...t, frontImage: true }))} className="hidden" />
                            {error.frontImage && touched.frontImage && (
                                <div className="text-red-500 text-xs mt-1">{error.frontImage}</div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Mặt sau của chứng chỉ</label>
                            <div className={`border rounded-lg p-2 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 ${error.backImage && touched.backImage ? 'border-red-400 bg-red-50' : ''}`} onClick={() => fileBackRef.current.click()}>
                                {preview.back ? <img src={preview.back} alt="Back Preview" className="h-32 mx-auto" /> : <FaFileImage className="mx-auto text-gray-400 text-3xl" />}<div>Bấm vào đây để tải ảnh</div>
                            </div>
                            <input type="file" name="backImage" ref={fileBackRef} onChange={handleCourseChange} onBlur={() => setTouched(t => ({ ...t, backImage: true }))} className="hidden" />
                            {error.backImage && touched.backImage && (
                                <div className="text-red-500 text-xs mt-1">{error.backImage}</div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleContinue}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2"
                    >
                        Tiếp tục <FaArrowRight />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">Nội dung cho khóa học</h2>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {contents.map((val, i) => (
                            <div key={i} className="flex items-start gap-2 bg-gray-50 p-2 rounded-md hover:bg-gray-100">
                                <span className="text-gray-500 mt-1">{i + 1}.</span>
                                <textarea
                                    value={val}
                                    onChange={e => handleContentChange(i, e.target.value)}
                                    className={`flex-1 border rounded p-2 resize-none ${error.contentsDetail && error.contentsDetail[i] && touched[`content${i}`] ? 'border-red-400 bg-red-50' : ''}`}
                                    rows={2}
                                    placeholder={`Nội dung buổi ${i + 1}`}
                                    required={true}
                                    onBlur={() => setTouched(t => ({ ...t, [`content${i}`]: true }))}
                                />
                                {error.contentsDetail && error.contentsDetail[i] && touched[`content${i}`] && (
                                    <div className="text-red-500 text-xs mt-1">{error.contentsDetail[i]}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Thêm trường Link Meet nếu cần */}
                    {/* <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Link Meet (https://...)"
                            className="w-full border p-2 rounded"
                        />
                    </div> */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setStep(1)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded flex items-center gap-2"
                        >
                            <FaArrowLeft /> Quay về
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Đang lưu...' : 'Lưu'} <FaSave />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateClassPage;
