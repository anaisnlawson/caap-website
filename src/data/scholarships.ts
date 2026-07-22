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
];
