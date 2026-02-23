let interviewList = [];
let rejectedList = [];
let defaultList = [];
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount');
let totalJobs = document.getElementById('totalJobs');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const mainContainer = document.querySelector('main')
const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section')

function calculateCount() {
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus == 'interview-filter-btn') {
        totalJobs.innerText = interviewList.length;
    } else if (currentStatus == 'rejected-filter-btn') {
        totalJobs.innerText = rejectedList.length;
    } else {
        totalJobs.innerText = allCardSection.children.length;
    }
}
calculateCount()

function toggleStyle(id) {
    allFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748bFF]')
    interviewFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748bFF]')
    rejectedFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748bFF]')

    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')

    const selected = document.getElementById(id)

    currentStatus = id
    console.log(currentStatus);

    selected.classList.remove('bg-[#FFFFFF]', 'text-[#64748bFF]')
    selected.classList.add('bg-[#3B82F6]', 'text-white') 

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden')
        totalJobs.innerText = interviewList.length;
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden')
        total.innerText = allCardSection.children.length;
        totalJobs.innerText = allCardSection.children.length;
    } else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        totalJobs.innerText = rejectedList.length;
        renderRejected()
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const companyName = parenNode.querySelector('.companyName').innerText
        const position = parenNode.querySelector('.job-title').innerText
        const locationTypeSalary = parenNode.querySelector('.job-type-salary').innerText
        const status = parenNode.querySelector('.status').innerText
        const description = parenNode.querySelector('.description').innerText

        parenNode.querySelector('.status').innerText = 'INTERVIEW'

        const cardInfo = {
            companyName,
            position,
            locationTypeSalary,
            status: 'INTERVIEW',
            description
        }

        const jobExist = interviewList.find(item => item.companyName == cardInfo.companyName)

        if (!jobExist) {
            interviewList.push(cardInfo)
        }
 
        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName)

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
        }
        calculateCount()


    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const companyName = parenNode.querySelector('.companyName').innerText
        const position = parenNode.querySelector('.job-title').innerText
        const locationTypeSalary = parenNode.querySelector('.job-type-salary').innerText
        const status = parenNode.querySelector('.status').innerText
        const description = parenNode.querySelector('.description').innerText

        parenNode.querySelector('.status').innerText = 'REJECTED'

        const cardInfo = {
            companyName,
            position,
            locationTypeSalary,
            status: 'REJECTED',
            description
        }

        const jobExist = rejectedList.find(item => item.companyName == cardInfo.companyName)

        if (!jobExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }
        calculateCount()

    } else if (event.target.classList.contains('delete-btn')) {
        
        const job = event.target.closest('.card');
        const companyName = job.querySelector('.companyName').innerText;

        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        job.remove();

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }

        if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }

        calculateCount();
    }
})

function renderDefault () {
    filterSection.innerHTML = '';
        let div = document.createElement('div');
        div.className = 'h-[400px] flex flex-col justify-center items-center text-center border border-[#f1f2f4] hover:border-teal-300 p-4 bg-white rounded-sm';
        div.innerHTML = `
            <div class="mb-5">
                <img src="./img/jobs.png" alt="">
            </div>
            <h3 class="font-semibold text-2xl">No jobs available</h3>
            <p class="text-base text-[#64748bFF]">Check back soon for new job opportunities</p>
        `
        filterSection.appendChild(div);
}

function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        renderDefault();
        return;
    } else {
        for (let interview of interviewList) {

            let div = document.createElement('div');
            div.className = 'flex justify-between border border-[#f1f2f4] hover:border-teal-300 p-4 bg-white rounded-sm';
            div.innerHTML = `
            <div class="space-y-6">
                    <div>
                        <p class="companyName font-semibold text-lg">${interview.companyName}</p>
                        <p class="job-title text-base text-[#64748bFF]">React Native Developer</p>
                    </div>

                    <div class="text-sm text-[#64748bFF]">
                       <p class ="job-type-salary">Remote • Full-time • $130,000 - $175,000</p>
                    </div>

                     <div>
                        <button class="status bg-[#10b981FF] text-white px-4 py-2 rounded-sm font-semibold cursor-pointer">INTERVIEW</button>
                    </div>

                    <div class="text-sm text-[#323b49FF]">
                        <p class="description">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                    </div>

                    <div class="flex gap-5">
                        <button class="interview-btn border border-[#10B981] text-[#10b981FF] hover:bg-[#10b981FF] hover:text-white px-4 py-2 rounded-sm font-semibold cursor-pointer">INTERVIEW</button>
                        <button class="rejected-btn border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white px-4 py-2 rounded-sm font-semibold cursor-pointer">REJECTED</button>
                    </div>
                </div>

                
                <div>
                    <div class="border-2 border-[#f1f2f4] p-1 text-[#64748B] hover:text-[#EF4444] w-full cursor-pointer">
                        <i class="delete-btn fa-solid fa-trash"></i>
                    </div>
                </div>
            `
            filterSection.appendChild(div)
        }

    }
    
}

function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedList.length === 0) {
        renderDefault();
        return;
    } else {
        for (let reject of rejectedList) {

            let div = document.createElement('div');
            div.className = 'flex justify-between border border-[#f1f2f4] hover:border-teal-300 p-4 bg-white rounded-sm';
            div.innerHTML = `
            <div class="space-y-6">
                    <div>
                        <p class="companyName font-semibold text-lg">${reject.companyName}</p>
                        <p class="job-title text-base text-[#64748bFF]">React Native Developer</p>
                    </div>

                    <div class="text-sm text-[#64748bFF]">
                        <p class ="job-type-salary">Remote • Full-time • $130,000 - $175,000</p>
                    </div>

                    <div>
                        <button class="status bg-[#EF4444] text-white px-4 py-2 rounded-sm font-semibold cursor-pointer">REJECTED</button>
                    </div>

                    <div class="text-sm text-[#323b49FF]">
                        <p class="description">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                    </div>

                    <div class="flex gap-5">
                        <button class="interview-btn border border-[#10B981] text-[#10b981FF] hover:bg-[#10b981FF] hover:text-white px-4 py-2 rounded-sm font-semibold cursor-pointer">INTERVIEW</button>
                        <button class="rejected-btn border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white px-4 py-2 rounded-sm font-semibold cursor-pointer">REJECTED</button>
                    </div>
                </div>

                
                <div>
                    <div class="border-2 border-[#f1f2f4] p-1 text-[#64748B] hover:text-[#EF4444] w-full cursor-pointer">
                        <i class="delete-btn fa-solid fa-trash"></i>
                    </div>
                </div>
            `
            filterSection.appendChild(div)
        }
    }
    
}



