/* ============================================================
   قاعدة بيانات مربط الواصلية
   ------------------------------------------------------------
   • تعمل افتراضياً بالتخزين المحلي (هذا الجهاز فقط).
   • لمزامنة الحجوزات بين جميع الأجهزة (جوال المالك، السكرتير...):
       1. افتح ملف "دليل-الإعداد.md" واتبع الخطوات.
       2. الصق رابط Google Apps Script في المتغيّر CLOUD_URL أدناه.
   ============================================================ */

const CLOUD_URL = ''; // ← الصق الرابط هنا، مثال: https://script.google.com/macros/s/XXXXX/exec

const STORE_KEY = 'wsl_bookings';

const WSL = {
  _local(){ return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); },
  _setLocal(arr){ localStorage.setItem(STORE_KEY, JSON.stringify(arr)); },

  /* قراءة كل الحجوزات (يدمج المحلي مع السحابي حسب رقم الطلب) */
  async getAll(){
    const local = this._local();
    if(!CLOUD_URL) return local;
    try{
      const res = await fetch(CLOUD_URL + '?action=list', { method:'GET' });
      const cloud = await res.json();
      const map = {};
      [...local, ...cloud].forEach(b => { if(b && b.ref) map[b.ref] = b; });
      const merged = Object.values(map);
      this._setLocal(merged);
      return merged;
    }catch(e){
      console.warn('تعذّر القراءة من السحابة، عرض البيانات المحلية:', e);
      return local;
    }
  },

  /* حفظ حجز جديد */
  async save(booking){
    const arr = this._local();
    arr.push(booking);
    this._setLocal(arr);
    if(CLOUD_URL){
      try{
        await fetch(CLOUD_URL, {
          method:'POST', mode:'no-cors',
          headers:{ 'Content-Type':'text/plain;charset=utf-8' },
          body: JSON.stringify({ action:'add', booking })
        });
      }catch(e){ console.warn('تعذّر الحفظ في السحابة (حُفظ محلياً):', e); }
    }
  },

  /* تغيير حالة حجز */
  async setStatus(ref, status){
    this._setLocal(this._local().map(b => b.ref===ref ? {...b, status} : b));
    if(CLOUD_URL){
      try{
        await fetch(CLOUD_URL, {
          method:'POST', mode:'no-cors',
          headers:{ 'Content-Type':'text/plain;charset=utf-8' },
          body: JSON.stringify({ action:'status', ref, status })
        });
      }catch(e){ console.warn('تعذّر تحديث الحالة في السحابة:', e); }
    }
  },

  /* حذف حجز */
  async remove(ref){
    this._setLocal(this._local().filter(b => b.ref!==ref));
    if(CLOUD_URL){
      try{
        await fetch(CLOUD_URL, {
          method:'POST', mode:'no-cors',
          headers:{ 'Content-Type':'text/plain;charset=utf-8' },
          body: JSON.stringify({ action:'delete', ref })
        });
      }catch(e){ console.warn('تعذّر الحذف من السحابة:', e); }
    }
  }
};
