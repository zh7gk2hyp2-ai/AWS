/* ============================================================
   قاعدة بيانات مربط الواصلية — Firebase Realtime Database
   ------------------------------------------------------------
   • مجاني 100% (Spark Plan — لا بطاقة بنكية).
   • يعمل افتراضياً بالتخزين المحلي على الجهاز.
   • لمزامنة الحجوزات بين جميع الأجهزة:
       1. أنشئ مشروع Firebase وأنشئ Realtime Database.
       2. في Rules اضبط read/write على true.
       3. الصق رابط قاعدة البيانات أدناه.
   ============================================================ */

const FIREBASE_URL    = 'https://wasilia-stable-default-rtdb.firebaseio.com';
const FIREBASE_SECRET = ' 07CuaraH3IRXHyyhGxv7wEe0NgbUdeW39hrhXUiF ';

const STORE_KEY = 'wsl_bookings';

const WSL = {

  /* ---- قراءة البيانات ---- */
  async getAll(){
    const local = this._local();
    if(!FIREBASE_URL) return local;
    try{
      const res  = await fetch(`${FIREBASE_URL}/bookings.json`);
      const data = await res.json();
      if(!data || typeof data !== 'object') return local;

      const cloud = Object.entries(data).map(([fbKey, b]) => ({...b, _fbKey: fbKey}));
      const map   = {};
      [...local, ...cloud].forEach(b => { if(b && b.ref) map[b.ref] = b; });
      const merged = Object.values(map);
      this._setLocal(merged);
      return merged;
    }catch(e){
      console.warn('Firebase: تعذّرت القراءة، عرض البيانات المحلية', e);
      return local;
    }
  },

  /* ---- حفظ حجز جديد ---- */
  async save(booking){
    const arr = this._local();
    arr.push(booking);
    this._setLocal(arr);
    if(!FIREBASE_URL) return;
    try{
      const res  = await fetch(`${FIREBASE_URL}/bookings.json`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(booking)
      });
      const {name: fbKey} = await res.json();
      this._setLocal(this._local().map(b => b.ref === booking.ref ? {...b, _fbKey: fbKey} : b));
    }catch(e){ console.warn('Firebase: تعذّر الحفظ (حُفظ محلياً)', e); }
  },

  /* ---- تغيير حالة حجز ---- */
  async setStatus(ref, status){
    const arr     = this._local();
    const booking = arr.find(b => b.ref === ref);
    this._setLocal(arr.map(b => b.ref === ref ? {...b, status} : b));
    if(!FIREBASE_URL || !booking?._fbKey) return;
    try{
      await fetch(`${FIREBASE_URL}/bookings/${booking._fbKey}.json`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status})
      });
    }catch(e){ console.warn('Firebase: تعذّر تحديث الحالة', e); }
  },

  /* ---- حذف حجز ---- */
  async remove(ref){
    const arr     = this._local();
    const booking = arr.find(b => b.ref === ref);
    this._setLocal(arr.filter(b => b.ref !== ref));
    if(!FIREBASE_URL || !booking?._fbKey) return;
    try{
      await fetch(`${FIREBASE_URL}/bookings/${booking._fbKey}.json`, {
        method: 'DELETE'
      });
    }catch(e){ console.warn('Firebase: تعذّر الحذف', e); }
  },

  _local(){ return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); },
  _setLocal(arr){ localStorage.setItem(STORE_KEY, JSON.stringify(arr)); }
};
