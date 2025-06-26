import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaBookOpen, FaSave, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserId } from '../../hooks/useUserId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const COURSE_OPTIONS = [
  { id: '1', name: 'Python cơ bản', teacher: 'Nguyễn Văn A', price: 500000 },
  { id: '2', name: 'IELTS Speaking', teacher: 'Trần Thị B', price: 350000 },
  { id: '3', name: 'Lập trình Web', teacher: 'Phạm Văn C', price: 450000 },
];

const WEEKDAYS = [
  { label: 'T2', value: 1 },
  { label: 'T3', value: 2 },
  { label: 'T4', value: 3 },
  { label: 'T5', value: 4 },
  { label: 'T6', value: 5 },
  { label: 'T7', value: 6 },
  { label: 'CN', value: 0 },
];

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

const CreateSlot = () => {
  const [slotData, setSlotData] = useState({
    studentEmail: '',
    courseId: '',
    dayOfWeeks: [],
    startTime: '',
    meetUrl: ''
  });
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState({});
  const { id } = useUserId();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ type: '', message: '' });

  const showDialog = (type, message) => {
    setDialogContent({ type, message });
    setDialogOpen(true);
  };
  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `https://localhost:7211/api/tutors/${id}/slots/courses`
        );
        if (!res.ok) throw new Error(`Lỗi ${res.message}`);
        const { data } = await res.json();
        setCourseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const validate = (data) => {
    const err = {};
    if (!data.studentEmail) err.studentEmail = 'Vui lòng nhập email học sinh';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.studentEmail)) {
      err.studentEmail = 'Email không hợp lệ';
    }
    if (!data.courseId) err.courseId = 'Chọn một khóa học';
    if (!data.dayOfWeeks.length) err.dayOfWeeks = 'Chọn ít nhất một ngày';
    if (!data.startTime) err.startTime = 'Chọn ngày bắt đầu';
    if (!data.meetUrl) err.meetUrl = 'Nhập meet url để bắt đầu';
    return err;
  };

  const toggleDay = (day) => {
    setSlotData(prev => ({
      ...prev,
      dayOfWeeks: prev.dayOfWeeks.includes(day)
        ? prev.dayOfWeeks.filter(d => d !== day)
        : [...prev.dayOfWeeks, day]
    }));
    setTouched(t => ({ ...t, dayOfWeeks: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlotData(prev => ({ ...prev, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
  };

  const handleSubmitSlot = () => {
    const err = validate(slotData);
    setError(err);
    setTouched({ studentEmail: true, courseId: true, dayOfWeeks: true, startTime: true, meetUrl: true });
    if (Object.keys(err).length) return;
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      toast.success('🎉 Đã tạo slot học cho học sinh thành công!', { position: 'top-center' });
      console.log(slotData);
      try {
        const response = await fetch(
          `https://localhost:7211/api/tutors/${id}/courses/${slotData.courseId}/slots`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slotData),
          }
        );
        const resJson = await response.json();
        if (!response.ok) {
          throw new Error(resJson?.message || "Lỗi kết nối server");
        }

        // 2. Lỗi nghiệp vụ (business), như "Slots already exists"
        if (resJson && resJson.success === false) {
          throw new Error(resJson.message || "Đã xảy ra lỗi khi tạo slot");
        }
        showDialog('success',"Tạo thành công");
      } catch (error) {
        setError(error.message);
        console.log(error.message)
        showDialog('error', error.message || "Có lỗi xảy ra!");
      }
      // setSlotData({ studentEmail: '', courseId: '', days: [], startDate: '', duration: '' });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-700">
        <FaBookOpen className="text-blue-400" /> Tạo Slot Học Cho Học Sinh
      </h2>
      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1 flex items-center gap-2">
          <FaEnvelope className="text-blue-500" /> Email học sinh
        </label>
        <input
          type="email"
          name="studentEmail"
          value={slotData.studentEmail}
          onChange={handleChange}
          onBlur={() => setTouched(t => ({ ...t, studentEmail: true }))}
          placeholder="example@student.com"
          className={`w-full border p-2 rounded-xl transition focus:border-blue-400 ${error.studentEmail && touched.studentEmail ? 'border-red-400 bg-red-50' : ''}`}
        />
        {error.studentEmail && touched.studentEmail && (
          <div className="text-red-500 text-xs mt-1">{error.studentEmail}</div>
        )}
      </div>
      {/* Course */}
      <div className="mb-4">
        <label className="block font-medium mb-1 flex items-center gap-2">
          <FaBookOpen className="text-blue-500" /> Chọn khóa học
        </label>
        <select
          name="courseId"
          value={slotData.courseId}
          onChange={handleChange}
          onBlur={() => setTouched(t => ({ ...t, courseId: true }))}
          className={`w-full border p-2 rounded-xl transition focus:border-blue-400 ${error.courseId && touched.courseId ? 'border-red-400 bg-red-50' : ''}`}
        >
          <option value="">-- Chọn khóa học --</option>
          {courseData.map(c =>
            <option key={c.id} value={c.id}>
              {c.title} – {c.tutorName} - {'Duration: ' + c.durationSession} - {formatVND(c.pricePerSession)}
            </option>
          )}
        </select>
        {error.courseId && touched.courseId && (
          <div className="text-red-500 text-xs mt-1">{error.courseId}</div>
        )}
      </div>
      {/* Weekdays */}
      <div className="mb-4">
        <label className="font-medium mb-2 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Chọn các ngày trong tuần
        </label>
        <div className="flex gap-2 flex-wrap">
          {WEEKDAYS.map(day => (
            <button
              key={day.value}
              type="button"
              onClick={() => toggleDay(day.value)}
              className={`rounded-full px-5 py-2 border font-semibold transition
                ${(slotData.dayOfWeeks || []).includes(day.value) ? 'bg-blue-500 text-white border-blue-500 shadow' : 'bg-gray-50 border-gray-300 text-gray-700'}
                hover:bg-blue-400 hover:text-white`}
            >
              {day.label}
            </button>
          ))}
        </div>
        {error.dayOfWeeks && touched.dayOfWeeks && (
          <div className="text-red-500 text-xs mt-1">{error.dayOfWeeks}</div>
        )}
      </div>
      {/* Start date & Duration */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Chọn giờ học bắt đầu.
          </label>
          <input
            type="time"
            name="startTime"
            value={slotData.startTime}
            onChange={handleChange}
            onBlur={() => setTouched(t => ({ ...t, startTime: true }))}
            className={`w-full border p-2 rounded-xl transition focus:border-blue-400 ${error.startTime && touched.startTime ? 'border-red-400 bg-red-50' : ''}`}
          />
          {error.startTime && touched.startTime && (
            <div className="text-red-500 text-xs mt-1">{error.startTime}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FontAwesomeIcon icon={faVideo} className='text-blue-500' /> Nhập link meet
          </label>
          <input
            type="text"
            name="meetUrl"
            value={slotData.meetUrl}
            onChange={handleChange}
            onBlur={() => setTouched(t => ({ ...t, meetUrl: true }))}
            placeholder="url: meet"
            className={`w-full border p-2 rounded-xl transition focus:border-blue-400 ${error.meetUrl && touched.meetUrl ? 'border-red-400 bg-red-50' : ''}`}
          />
          {error.meetUrl && touched.meetUrl && (
            <div className="text-red-500 text-xs mt-1">{error.meetUrl}</div>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          disabled={loading}
          onClick={handleSubmitSlot}
          className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-full shadow-lg font-semibold flex items-center gap-3 text-lg transition
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" /><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" /></svg>
              Đang tạo slot...
            </>
          ) : (
            <>Tạo slot <FaSave /></>
          )}
        </button>
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300" aria-hidden="true" />
        {/* AnimatePresence giúp hiệu ứng đóng/mở mượt mà */}
        <AnimatePresence>
          <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-3xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center text-center relative"
            >
              {/* Hiệu ứng và icon */}
              {dialogContent.type === 'success' ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1.1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="mb-2"
                >
                  <FaCheckCircle className="text-green-500 text-5xl drop-shadow-glow" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="mb-2"
                >
                  <FaTimesCircle className="text-red-500 text-5xl drop-shadow-glow" />
                </motion.div>
              )}
              <Dialog.Title as="div" className="text-2xl font-bold mb-1">
                {dialogContent.type === 'success' ? '🎉 Thành công' : '😥 Lỗi'}
              </Dialog.Title>
              <div className="text-base text-gray-600 mb-3" />
              {/* Thông điệp phụ vui vẻ hoặc an ủi */}
              {dialogContent.type === 'success' ? (
                <div className="mb-4 text-green-500 font-semibold animate-pulse">{dialogContent.message}</div>
              ) : (
                <div className="mb-4 text-red-400 font-medium">{dialogContent.message}</div>
              )}
              <button
                className="bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-700 hover:to-pink-600 text-white px-8 py-2 rounded-full font-semibold shadow-lg transition"
                onClick={() => setDialogOpen(false)}
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Dialog>
    </div>

  );
};

export default CreateSlot;
