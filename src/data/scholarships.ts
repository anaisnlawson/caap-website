// Scholarship data for the searchable Scholarships page.
// Deadlines/amounts shift each cycle — always confirm on the official site.

export type Identity =
  | 'Black / African American'
  | 'Hispanic / Latino'
  | 'Asian / Pacific Islander'
  | 'Native American / Indigenous'
  | 'Students of Color (any)';

// How income factors into eligibility.
//  - 'Low income'         => aimed at low-income / Pell-eligible students
//  - 'Low–Middle income'  => low and middle-class students can qualify
//  - 'No income requirement' => open regardless of income (merit / identity based)
export type Income = 'Low income' | 'Low–Middle income' | 'No income requirement';

// What the award is primarily based on.
export type Basis = 'Need-based' | 'Merit-based' | 'Need + Merit';

export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  identities: Identity[];
  income: Income;
  basis: Basis;
  field?: string; // e.g. STEM, Nursing, Journalism
  link: string;
  description: string;
}

export const IDENTITIES: Identity[] = [
  'Black / African American',
  'Hispanic / Latino',
  'Asian / Pacific Islander',
  'Native American / Indigenous',
  'Students of Color (any)',
];

export const INCOME_OPTIONS: Income[] = [
  'Low income',
  'Low–Middle income',
  'No income requirement',
];

export const BASIS_OPTIONS: Basis[] = [
  'Need-based',
  'Merit-based',
  'Need + Merit',
];

export const scholarships: Scholarship[] = [
  // ---- Large need-based / low-income (minority-friendly) ----
  {
    name: 'QuestBridge National College Match',
    provider: 'QuestBridge',
    amount: 'Full 4-year scholarship (~$360k value, no loans)',
    deadline: 'Late September',
    identities: ['Students of Color (any)'],
    income: 'Low income',
    basis: 'Need + Merit',
    link: 'https://www.questbridge.org/',
    description:
      'Matches high-achieving, low-income high school seniors with full four-year scholarships to top partner colleges — no parental contribution, no loans.',
  },
  {
    name: 'The Gates Scholarship',
    provider: 'Bill & Melinda Gates Foundation',
    amount: 'Full cost of attendance (last-dollar)',
    deadline: 'Mid-September',
    identities: ['Students of Color (any)'],
    income: 'Low income',
    basis: 'Need + Merit',
    link: 'https://www.thegatesscholarship.org/',
    description:
      'Pell-eligible minority high school seniors (Black, Latino, Native American, Asian/Pacific Islander) with strong academics and leadership.',
  },
  {
    name: 'Dell Scholars Program',
    provider: 'Michael & Susan Dell Foundation',
    amount: '$20,000 + laptop + ongoing support',
    deadline: 'December 1',
    identities: ['Students of Color (any)'],
    income: 'Low income',
    basis: 'Need + Merit',
    link: 'https://www.dellscholars.org/',
    description:
      'First-gen and low-income students with a 2.4+ GPA who participate in an approved college-readiness program (AVID, Upward Bound, etc.).',
  },
  {
    name: 'Coca-Cola Scholars Program',
    provider: 'Coca-Cola Scholars Foundation',
    amount: '$20,000',
    deadline: 'Early October',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://www.coca-colascholarsfoundation.org/',
    description:
      'Merit award for high school seniors with strong leadership, service, and academics. No income requirement — many recipients are first-gen/low-income.',
  },
  {
    name: 'Jack Kent Cooke Foundation College Scholarship',
    provider: 'Jack Kent Cooke Foundation',
    amount: 'Up to $55,000/year',
    deadline: 'Mid-November',
    identities: ['Students of Color (any)'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://www.jkcf.org/our-scholarships/',
    description:
      'High-achieving students with financial need (family income up to ~$95k considered). Last-dollar funding after other aid.',
  },
  {
    name: 'Horatio Alger National Scholarship',
    provider: 'Horatio Alger Association',
    amount: '$25,000',
    deadline: 'Late October',
    identities: ['Students of Color (any)'],
    income: 'Low income',
    basis: 'Need-based',
    link: 'https://scholars.horatioalger.org/',
    description:
      'For students who have overcome significant adversity and demonstrate critical financial need.',
  },
  {
    name: 'Ron Brown Scholar Program',
    provider: 'CAP Charitable Foundation',
    amount: '$40,000 over 4 years',
    deadline: 'January',
    identities: ['Black / African American'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://www.ronbrown.org/',
    description:
      'Black high school seniors with academic excellence, leadership, and financial need.',
  },
  {
    name: 'Jackie Robinson Foundation Scholarship',
    provider: 'Jackie Robinson Foundation',
    amount: 'Up to $30,000 over 4 years',
    deadline: 'January',
    identities: ['Students of Color (any)'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://www.jackierobinson.org/',
    description:
      'Minority high school seniors with leadership potential and financial need, plus mentoring and career support.',
  },

  // ---- Black / African American ----
  {
    name: 'UNCF (United Negro College Fund) Scholarships',
    provider: 'UNCF',
    amount: '$2,000–$15,000',
    deadline: 'Varies (Jan–Apr)',
    identities: ['Black / African American'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://uncf.org/scholarships',
    description:
      'The largest private scholarship provider for minority students. One profile connects you to many awards; most require ~2.5 GPA + FAFSA.',
  },
  {
    name: 'Thurgood Marshall College Fund (TMCF)',
    provider: 'Thurgood Marshall College Fund',
    amount: '$500–$5,000',
    deadline: 'Varies (Jan–May)',
    identities: ['Black / African American'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://www.tmcf.org/',
    description:
      'Supports students attending public HBCUs and predominantly Black institutions.',
  },
  {
    name: 'NAACP Scholarships',
    provider: 'NAACP',
    amount: 'Varies',
    deadline: 'April–May',
    identities: ['Black / African American'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://naacp.org/find-resources/scholarships-awards-internships/scholarships',
    description:
      'Multiple awards for Black students at all college levels; membership required for most.',
  },
  {
    name: 'Development Fund for Black Students in Science & Technology',
    provider: 'DFBSST',
    amount: 'Up to $3,000/year',
    deadline: 'April',
    identities: ['Black / African American'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    field: 'STEM',
    link: 'https://dfbsstscholarship.org/',
    description:
      'Black undergraduates studying science or engineering, primarily at HBCUs.',
  },
  {
    name: 'NSBE Scholarships',
    provider: 'National Society of Black Engineers',
    amount: '$1,000–$20,000',
    deadline: 'Varies (Fall/Spring)',
    identities: ['Black / African American'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'STEM',
    link: 'https://www.nsbe.org/',
    description:
      'Black students pursuing engineering and technical majors. Membership required.',
  },
  {
    name: 'National Black Nurses Association (NBNA) Scholarships',
    provider: 'NBNA',
    amount: '$1,000+',
    deadline: 'Spring',
    identities: ['Black / African American'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Nursing',
    link: 'https://nbna.org/programs-committees/programs/scholarships/',
    description:
      'Black nursing students (LPN to Doctorate) who are NBNA members.',
  },
  {
    name: 'NABJ Scholarships',
    provider: 'National Association of Black Journalists',
    amount: '~$2,500',
    deadline: 'Spring',
    identities: ['Black / African American'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Journalism / Media',
    link: 'https://nabjonline.org/',
    description:
      'Black students pursuing careers in journalism and media.',
  },
  {
    name: 'Actuarial Diversity Scholarship',
    provider: 'The Actuarial Foundation',
    amount: '$1,000–$4,000',
    deadline: 'Spring',
    identities: ['Black / African American', 'Hispanic / Latino', 'Native American / Indigenous'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Actuarial Science / Math',
    link: 'https://www.actuarialfoundation.org/scholarships/',
    description:
      'Black, Hispanic, and Native American students pursuing actuarial careers.',
  },
  {
    name: 'BEYA STEM Scholarships',
    provider: 'Black Engineer of the Year Awards',
    amount: 'Varies',
    deadline: 'Varies',
    identities: ['Black / African American'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'STEM',
    link: 'https://beya.org/',
    description:
      'African American students excelling in science, technology, engineering, and math.',
  },

  // ---- Hispanic / Latino ----
  {
    name: 'Hispanic Scholarship Fund (HSF)',
    provider: 'Hispanic Scholarship Fund',
    amount: '$500–$5,000',
    deadline: 'Mid-February',
    identities: ['Hispanic / Latino'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://www.hsf.net/scholarship',
    description:
      'Students of Hispanic heritage (citizen/PR/DACA). 3.0 GPA HS / 2.5 college. Awards based on merit and relative need.',
  },
  {
    name: 'Congressional Hispanic Caucus Institute (CHCI) Scholarship',
    provider: 'CHCI',
    amount: '$1,000–$5,000',
    deadline: 'Spring',
    identities: ['Hispanic / Latino'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://chci.org/programs/scholarship-program/',
    description:
      'Latino students with a history of public service and financial need.',
  },
  {
    name: 'LULAC National Scholarship Fund',
    provider: 'League of United Latin American Citizens',
    amount: '$250–$2,000',
    deadline: 'March (varies by council)',
    identities: ['Hispanic / Latino'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://lnesc.org/lnsf/',
    description:
      'Hispanic students with academic achievement and community involvement.',
  },
  {
    name: 'Hispanic Heritage Youth Awards',
    provider: 'Hispanic Heritage Foundation',
    amount: 'Varies',
    deadline: 'October–November',
    identities: ['Hispanic / Latino'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://hispanicheritage.org/programs/leadership/youth-awards/',
    description:
      'Recognizes Latino high school seniors for academic and community achievement.',
  },
  {
    name: 'Great Minds in STEM (HENAAC) Scholarship',
    provider: 'Great Minds in STEM',
    amount: '$500–$10,000',
    deadline: 'Spring',
    identities: ['Hispanic / Latino'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'STEM',
    link: 'https://www.greatmindsinstem.org/',
    description:
      'Hispanic students pursuing science, technology, engineering, and math degrees.',
  },
  {
    name: 'SHPE Scholarships',
    provider: 'Society of Hispanic Professional Engineers',
    amount: 'Varies',
    deadline: 'Spring',
    identities: ['Hispanic / Latino'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'STEM',
    link: 'https://www.shpe.org/students/scholarships',
    description:
      'Hispanic students in engineering and STEM fields. Membership required.',
  },
  {
    name: 'TheDream.US National Scholarship',
    provider: 'TheDream.US',
    amount: 'Up to $33,000',
    deadline: 'Late February',
    identities: ['Hispanic / Latino', 'Students of Color (any)'],
    income: 'Low income',
    basis: 'Need-based',
    link: 'https://www.thedream.us/scholarships/',
    description:
      'DACA and undocumented students with significant financial need.',
  },

  // ---- Asian / Pacific Islander ----
  {
    name: 'APIA Scholars',
    provider: 'Asian & Pacific Islander American Scholarship Fund',
    amount: '$2,500–$20,000',
    deadline: 'Mid-January',
    identities: ['Asian / Pacific Islander'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://apiascholars.org/',
    description:
      'Asian and Pacific Islander students with financial need, strong emphasis on Pell-eligible applicants.',
  },
  {
    name: 'AAJA Scholarships',
    provider: 'Asian American Journalists Association',
    amount: 'Varies',
    deadline: 'Spring',
    identities: ['Asian / Pacific Islander'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Journalism / Media',
    link: 'https://www.aaja.org/',
    description:
      'Asian/Pacific Islander students pursuing careers in journalism.',
  },

  // ---- Native American / Indigenous ----
  {
    name: 'American Indian College Fund',
    provider: 'American Indian College Fund',
    amount: '~$2,000–$3,000 avg',
    deadline: 'Late May',
    identities: ['Native American / Indigenous'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://collegefund.org/students/scholarships/',
    description:
      'Native American and Alaska Native students. One application considers you for many awards (2.0 GPA + FAFSA).',
  },
  {
    name: 'Native Forward Scholars Fund',
    provider: 'Native Forward',
    amount: 'Varies',
    deadline: 'Spring',
    identities: ['Native American / Indigenous'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://nativeforward.org/',
    description:
      'Enrolled members or descendants of recognized tribes; need- and merit-based awards.',
  },
  {
    name: 'American Indian Services Scholarship',
    provider: 'American Indian Services',
    amount: 'Up to $2,000/semester',
    deadline: 'Quarterly',
    identities: ['Native American / Indigenous'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://americanindianservices.org/',
    description:
      'Students of tribal descent with a 2.0 GPA; FAFSA required.',
  },
  {
    name: 'Cobell Scholarship',
    provider: 'Indigenous Education, Inc.',
    amount: 'Varies',
    deadline: 'Late May',
    identities: ['Native American / Indigenous'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://cobellscholar.org/',
    description:
      'Native American and Alaska Native students enrolled in a federally recognized tribe.',
  },

  // ---- Broad students of color / additional ----
  {
    name: 'Point Foundation Scholarship',
    provider: 'Point Foundation',
    amount: 'Varies',
    deadline: 'Winter',
    identities: ['Students of Color (any)'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    link: 'https://pointfoundation.org/',
    description:
      'LGBTQ students, including BIPOC applicants, with leadership and financial need.',
  },
  {
    name: 'Gen and Kelly Tanabe Scholarship',
    provider: 'Gen and Kelly Tanabe',
    amount: '$1,000',
    deadline: 'Twice yearly',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://www.genkellyscholarship.com/',
    description:
      'Open to all students, including students of color. Based on a short personal statement — no income requirement.',
  },
  {
    name: 'Bold.org Minority Scholarships',
    provider: 'Bold.org',
    amount: 'Varies',
    deadline: 'Rolling',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://bold.org/scholarships/by-demographics/minorities/',
    description:
      'A regularly updated hub of essay and no-essay awards for students of color with ongoing deadlines.',
  },
  {
    name: 'Equitable Excellence Scholarship',
    provider: 'Equitable Foundation',
    amount: '$2,500–$20,000',
    deadline: 'December',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://equitable.com/foundation/equitable-excellence-scholarship',
    description:
      'High school seniors who demonstrate drive and determination. No income requirement.',
  },

  // ---- Leadership / identity-based ----
  {
    name: 'Posse Foundation Scholarship',
    provider: 'The Posse Foundation',
    amount: 'Full 4-year tuition (often $100k+)',
    deadline: 'Fall (nomination in spring)',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    link: 'https://www.possefoundation.org/',
    description:
      'Full-tuition leadership scholarship for high school seniors in select cities incl. NYC. No GPA/test minimums — chosen for leadership and teamwork. Must be nominated by a school or community org.',
  },

  // ---- NYC / New York based ----
  {
    name: 'Hispanic Federation Scholarships',
    provider: 'Hispanic Federation',
    amount: 'Varies',
    deadline: 'Varies',
    identities: ['Hispanic / Latino'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    field: 'NYC / tri-state',
    link: 'https://hispanicfederation.org/',
    description:
      'Scholarships for Hispanic/Latinx undergraduates in NYC and the tri-state area; requires financial need and community involvement.',
  },
  {
    name: 'The Opportunity Network Fellows Program',
    provider: 'The Opportunity Network',
    amount: 'College & career program + support',
    deadline: '10th grade (NYC)',
    identities: ['Students of Color (any)'],
    income: 'Low income',
    basis: 'Need + Merit',
    field: 'NYC',
    link: 'https://opportunitynetwork.org/',
    description:
      'Six-year college and career prep for high-achieving, low-income NYC students from underrepresented backgrounds, with mentorship and paid internships.',
  },
  {
    name: 'Prep for Prep',
    provider: 'Prep for Prep',
    amount: 'Academic + college support',
    deadline: 'Grades 5–6 (NYC)',
    identities: ['Students of Color (any)'],
    income: 'Low–Middle income',
    basis: 'Merit-based',
    field: 'NYC',
    link: 'https://www.prepforprep.org/',
    description:
      'Leadership pipeline for NYC students of color — access to top schools plus significant academic, financial, and college counseling support.',
  },
  {
    name: 'La Unidad Latina Foundation Scholarship',
    provider: 'La Unidad Latina Foundation',
    amount: '$250–$1,000',
    deadline: 'Spring & Fall cycles',
    identities: ['Hispanic / Latino'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    field: 'NYC / national',
    link: 'https://www.lulf.org/',
    description:
      'Latino undergraduates (NYC roots, awarded nationally) with community involvement and financial need.',
  },
  {
    name: 'NY State Excelsior Scholarship',
    provider: 'NYS Higher Education Services Corp (HESC)',
    amount: 'Free SUNY/CUNY tuition',
    deadline: 'Summer',
    identities: ['Students of Color (any)'],
    income: 'Low–Middle income',
    basis: 'Need-based',
    field: 'New York residents',
    link: 'https://www.hesc.ny.gov/pay-for-college/financial-aid/types-of-financial-aid/nys-grants-scholarships-awards/the-excelsior-scholarship.html',
    description:
      'Covers SUNY/CUNY tuition for NY residents whose family income falls under the state threshold (~$125k). Open to all NY residents, including students of color.',
  },

  // ---- Discipline / major based ----
  {
    name: 'AICPA Scholarship for Minority Accounting Students',
    provider: 'AICPA Foundation',
    amount: 'Up to $5,000–$10,000',
    deadline: 'Mid-March',
    identities: ['Black / African American', 'Hispanic / Latino', 'Native American / Indigenous', 'Asian / Pacific Islander'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Accounting',
    link: 'https://www.thiswaytocpa.com/education/aicpa-legacy-scholarships/',
    description:
      'Students of color pursuing accounting (3.0+ GPA). One application covers multiple AICPA Legacy scholarships.',
  },
  {
    name: 'Emma Bowen Foundation Fellowship',
    provider: 'Emma Bowen Foundation',
    amount: 'Paid multi-year internship + stipend',
    deadline: 'Rolling (through spring)',
    identities: ['Students of Color (any)'],
    income: 'Low–Middle income',
    basis: 'Need + Merit',
    field: 'Media / Tech / Business',
    link: 'https://www.emmabowenfoundation.com/',
    description:
      'Students of color get paid multi-year summer internships in media, tech, and business, plus networking and career development.',
  },
  {
    name: 'INROADS Internship Program',
    provider: 'INROADS',
    amount: 'Paid internships + training',
    deadline: 'Varies',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Business / STEM',
    link: 'https://inroads.org/',
    description:
      'Leadership training and paid internships for high-potential students of color across business, STEM, and more.',
  },
  {
    name: 'Management Leadership for Tomorrow (MLT)',
    provider: 'MLT',
    amount: 'Fellowship + career coaching',
    deadline: 'Varies by program',
    identities: ['Black / African American', 'Hispanic / Latino', 'Native American / Indigenous'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Business',
    link: 'https://mlt.org/',
    description:
      'Career prep, coaching, and networking for Black, Latinx, and Native American students pursuing business and leadership careers.',
  },
  {
    name: 'AISES Scholarships',
    provider: 'American Indian Science & Engineering Society',
    amount: 'Varies',
    deadline: 'Varies (many in spring)',
    identities: ['Native American / Indigenous'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'STEM',
    link: 'https://aises.org/scholarships/',
    description:
      'Indigenous students (American Indian, Alaska Native, Native Hawaiian, Pacific Islander) in STEM. Full-time enrollment, 3.0+ GPA, tribal affiliation.',
  },
  {
    name: 'Society of Women Engineers (SWE) Scholarships',
    provider: 'Society of Women Engineers',
    amount: '$1,000–$15,000',
    deadline: 'Feb–May',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Engineering / Computing',
    link: 'https://swe.org/scholarships/',
    description:
      'Women (including women of color) in engineering, computing, and tech. One application covers many awards.',
  },
  {
    name: 'GEM Fellowship',
    provider: 'The National GEM Consortium',
    amount: 'Full tuition + paid internship (grad)',
    deadline: 'November',
    identities: ['Black / African American', 'Hispanic / Latino', 'Native American / Indigenous'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Graduate STEM',
    link: 'https://www.gemfellowship.org/',
    description:
      'Underrepresented minority students pursuing a master’s or PhD in engineering or science; full tuition plus paid summer internships.',
  },
  {
    name: 'Generation Google Scholarship',
    provider: 'Google',
    amount: '$10,000',
    deadline: 'Winter',
    identities: ['Students of Color (any)'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Computer Science / Tech',
    link: 'https://buildyourfuture.withgoogle.com/scholarships',
    description:
      'For students from historically underrepresented groups in tech pursuing computer science or related degrees.',
  },
  {
    name: 'NAHN Scholarship',
    provider: 'National Association of Hispanic Nurses',
    amount: '$1,000–$5,000',
    deadline: 'Spring',
    identities: ['Hispanic / Latino'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Nursing',
    link: 'https://nahnnet.org/scholarships',
    description:
      'Hispanic/Latino nursing students at any level; NAHN membership required.',
  },
  {
    name: 'NABA Scholarships',
    provider: 'National Association of Black Accountants',
    amount: '$1,500–$10,000',
    deadline: 'Winter',
    identities: ['Black / African American'],
    income: 'No income requirement',
    basis: 'Merit-based',
    field: 'Accounting / Finance',
    link: 'https://www.nabainc.org/',
    description:
      'Black students pursuing accounting, finance, and business degrees; NABA membership required.',
  },
];
