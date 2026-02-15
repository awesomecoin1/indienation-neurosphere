const SUPABASE_URL = "https://seytfjndfvjrneaupvry.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleXRmam5kZnZqcm5lYXVwdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTMwMzMsImV4cCI6MjA4NjYyOTAzM30.uEQOi2kJvgm6P94_66yiMmsaB1eBO0tga8CjlaT9bz4";
const supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_KEY);

window.onload = () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                checkSession();
            }, 1000);
        }
    }, 3000);
};

async function checkSession() {
    const iid = localStorage.getItem('NEURO_IID');
    if (!iid) {
        document.getElementById('auth-screen').style.display = 'flex';
    } else {
        const { data, error } = await supabase.from('citizens').select('*').eq('iid', iid).single();
        if (error || !data) {
            localStorage.clear();
            location.reload();
        } else {
            document.getElementById('main-vault').style.display = 'flex';
            loadVaultData(data);
        }
    }
}

function loadVaultData(user) {
    document.getElementById('display-name').innerText = user.full_name;
    document.getElementById('display-iid').innerText = user.iid;

    const baseVal = 99999.9997;
    setInterval(() => {
        const liveVal = baseVal + (Math.random() * 0.0002);
        document.getElementById('eur-val').innerText = "€" + liveVal.toLocaleString('de-DE', {minimumFractionDigits: 4});
        document.getElementById('idr-val').innerText = "Rp " + (liveVal * 17250).toLocaleString('id-ID');
    }, 1000);
}

async function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const dob = document.getElementById('reg-dob').value;
    if(!name || !dob) return alert("Please fill identity!");

    const newIID = "IID-GAG" + Math.floor(100000 + Math.random() * 900000);
    const { error } = await supabase.from('citizens').insert([{ iid: newIID, full_name: name, birth_date: dob }]);

    if(error) alert("Error: " + error.message);
    else {
        localStorage.setItem('NEURO_IID', newIID);
        location.reload();
    }
}

function handleLogout() {
    localStorage.clear();
    location.reload();
}
