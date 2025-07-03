import { useCallback, useEffect, useState } from 'react';
import { FaCalendarAlt, FaBookOpen, FaSave, FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useUserId } from '../../hooks/useUserId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

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
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
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


  const fetchCourse = useCallback(async () => {
    try {
      const res = await fetch(`https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/tutors/${id}/courses/1/students`);
      if (!res.ok) throw new Error(`Lỗi ${res.status}`);
      const { data } = await res.json();
      setStudentCourseList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // <-- đảm bảo dependency ổn định

  useEffect(() => {
    if (!id) return;
    fetchCourse(); // ✅ không warning nữa
  }, [id, fetchCourse]);

  const validate = (data) => {
    const err = {};
    if (!data.studentEmail) err.studentEmail = 'Vui lòng chọn học sinh';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.studentEmail)) {
      err.studentEmail = 'Email không hợp lệ';
    }
    if (!data.courseId) err.courseId = 'Chọn một khóa học';
    if (!data.dayOfWeeks.length) err.dayOfWeeks = 'Chọn ít nhất một ngày';
    if (!data.startTime) err.startTime = 'Chọn giờ bắt đầu';
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

  const handleStudentChange = (e) => {
    const email = e.target.value;
    setSlotData(prev => ({ ...prev, studentEmail: email, courseId: '' }));
    setTouched(t => ({ ...t, studentEmail: true }));

    const student = studentCourseList.find(s => s.studentEmail === email);
    if (student) {
      setCourseOptions(student.courseCreateSlots);
    } else {
      setCourseOptions([]);
    }
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

      try {
        const response = await fetch(
          `https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/tutors/${id}/courses/${slotData.courseId}/slots`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slotData),
          }
        );
        const resJson = await response.json();
        if (!response.ok || resJson.success === false) {
          throw new Error(resJson?.message || "Đã xảy ra lỗi");
        }
        showDialog('success', "Tạo thành công");
      } catch (error) {
        setError(error.message);
        showDialog('error', error.message || "Có lỗi xảy ra!");
      } finally {
        fetchCourse();
        setSlotData({
          studentEmail: '',
          courseId: '',
          dayOfWeeks: [],
          startTime: '',
          meetUrl: ''
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg mt-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-700">
        <FaBookOpen className="text-blue-400" /> Tạo Slot Học Cho Học Sinh
      </h2>

      {/* Chọn học sinh */}
      <div className="mb-4">
        <label className="block font-medium mb-1 flex items-center gap-2">
          <FaEnvelope className="text-blue-500" /> Chọn học sinh
        </label>
        <select
          name="studentEmail"
          value={slotData.studentEmail}
          onChange={handleStudentChange}
          className={`w-full border p-2 rounded-xl ${error.studentEmail && touched.studentEmail ? 'border-red-400 bg-red-50' : ''}`}
        >
          <option value="">-- Chọn học sinh --</option>
          {studentCourseList.map(s => (
            <option key={s.studentEmail} value={s.studentEmail}>{s.studentEmail}</option>
          ))}
        </select>
        {error.studentEmail && touched.studentEmail && (
          <div className="text-red-500 text-xs mt-1">{error.studentEmail}</div>
        )}
      </div>

      {/* Chọn khóa học */}
      <div className="mb-4">
        <label className="block font-medium mb-1 flex items-center gap-2">
          <FaBookOpen className="text-blue-500" /> Chọn khóa học
        </label>
        <select
          name="courseId"
          value={slotData.courseId}
          onChange={handleChange}
          className={`w-full border p-2 rounded-xl ${error.courseId && touched.courseId ? 'border-red-400 bg-red-50' : ''}`}
        >
          <option value="">-- Chọn khóa học --</option>
          {courseOptions.map(c => (
            <option key={c.id} value={c.id}>
              {c.title} – {c.tutorName} – {formatVND(c.pricePerSession)}
            </option>
          ))}
        </select>
        {error.courseId && touched.courseId && (
          <div className="text-red-500 text-xs mt-1">{error.courseId}</div>
        )}
      </div>

      {/* Ngày trong tuần */}
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
              className={`rounded-full px-5 py-2 border font-semibold
                ${(slotData.dayOfWeeks || []).includes(day.value)
                  ? 'bg-blue-500 text-white border-blue-500 shadow'
                  : 'bg-gray-50 border-gray-300 text-gray-700'}
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

      {/* Giờ bắt đầu và link meet */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Giờ bắt đầu
          </label>
          <input
            type="time"
            name="startTime"
            value={slotData.startTime}
            onChange={handleChange}
            className={`w-full border p-2 rounded-xl ${error.startTime && touched.startTime ? 'border-red-400 bg-red-50' : ''}`}
          />
          {error.startTime && touched.startTime && (
            <div className="text-red-500 text-xs mt-1">{error.startTime}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FontAwesomeIcon icon={faVideo} className="text-blue-500" /> Link Meet
          </label>
          <input
            type="text"
            name="meetUrl"
            value={slotData.meetUrl}
            onChange={handleChange}
            placeholder="meet.google.com/..."
            className={`w-full border p-2 rounded-xl ${error.meetUrl && touched.meetUrl ? 'border-red-400 bg-red-50' : ''}`}
          />
          {error.meetUrl && touched.meetUrl && (
            <div className="text-red-500 text-xs mt-1">{error.meetUrl}</div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-8">
        <button
          disabled={loading}
          onClick={handleSubmitSlot}
          className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full shadow-lg font-semibold flex items-center gap-3 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Đang tạo slot...' : <>Tạo slot <FaSave /></>}
        </button>
      </div>

      {/* Dialog kết quả */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <AnimatePresence>
          <motion.div className="fixed z-50 inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center text-center"
            >
              {dialogContent.type === 'success' ? (
                <FaCheckCircle className="text-green-500 text-5xl mb-2" />
              ) : (
                <FaTimesCircle className="text-red-500 text-5xl mb-2" />
              )}
              <Dialog.Title className="text-xl font-bold mb-2">
                {dialogContent.type === 'success' ? '🎉 Thành công' : '😥 Lỗi'}
              </Dialog.Title>
              <p className="text-gray-600 mb-4">{dialogContent.message}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
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
