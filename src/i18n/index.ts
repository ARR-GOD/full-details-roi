import type { Lang } from '../model/format'

export type { Lang }
export const LANGS: Lang[] = ['fr', 'en', 'es']

/** Every translatable string in the app. */
export interface Dict {
  appTitle: string
  glossary: string
  reset: string
  internal: string
  presentation: string
  // Inputs card
  inputs: string
  rev: string
  aov: string
  recur: string
  repeat: string
  margin: string
  rwLoy: string
  rwRef: string
  // Integrations
  integrations: string
  integrationNames: Record<
    | 'checkout'
    | 'crm'
    | 'pos'
    | 'social'
    | 'reviews'
    | 'whatsapp'
    | 'subscription'
    | 'support'
    | 'mobileApp'
    | 'wallet',
    string
  >
  // Scenario card
  mostProbable: string
  scoreFit: string
  additionalRevenue: string
  incrementalRevenue: string
  incrementalNetProfit: string
  plan: string
  platformCost: string
  grossRoi: string
  netRoi: string
  estimatedOver: string
  perYear: string
  // Scenario columns
  low: string
  mid: string
  best: string
  // Column groups
  scenarioDetails: string
  totals: string
  pricingScore: string
  // Scenario details table rows
  members: string
  aovAfter: string
  repAfter: string
  grossUplift: string
  trueGross: string
  loyaltyCost: string
  loyaltyGP: string
  loyaltyNP: string
  referralRevenue: string
  referralTrue: string
  referralOrders: string
  referralCost: string
  referralGP: string
  referralNP: string
  walletPasses: string
  loyaltySection: string
  referralSection: string
  walletSection: string
  // Totals table
  totalGrossUplift: string
  revenueAfter: string
  totalIncremental: string
  incrementalAfter: string
  incrementalGP: string
  totalCost: string
  totalNP: string
  ordersAfter: string
  aovUplift: string
  repeatUplift: string
  rpcUplift: string
  metricsSection: string
  // Pricing table
  monthlyOrders: string
  autoPlan: string
  customPlan: string
  lite: string
  premium: string
  enterprise: string
  walletAddon: string
  walletPassesTiered: string
  walletPriceAuto: string
  walletPriceManual: string
  annualPrice: string
  // Score table
  scoreFitTable: string
  coefficient: string
  value: string
  revenueBand: string
  total: string
  // Annex
  annex: string
  annexAov: string
  annexRep: string
  allCustomers: string
  bestScenario: string
  minReward: string
  incrementality: string
  expiryMonths: string
  // Settings
  settings: string
  clientName: string
  manualOrders: string
  manualPasses: string
  showAnnex: string
  // Glossary content
  glossaryTitle: string
  glossarySections: { title: string; body: string }[]
  close: string
}

const en: Dict = {
  appTitle: 'Pricing & ROI',
  glossary: 'Glossary',
  reset: 'Reset',
  internal: 'Internal',
  presentation: 'Presentation',
  inputs: 'Inputs',
  rev: 'Annual revenue',
  aov: 'AOV (average order value)',
  recur: 'Recurring customers rate',
  repeat: 'Repeat rate (Wallet)',
  margin: 'Gross margin',
  rwLoy: 'Reward loyalty',
  rwRef: 'Reward referrals',
  integrations: 'Integrations',
  integrationNames: {
    checkout: 'Checkout',
    crm: 'CRM',
    pos: 'POS',
    social: 'Social',
    reviews: 'Reviews',
    whatsapp: 'WhatsApp',
    subscription: 'Subscription',
    support: 'Support',
    mobileApp: 'Mobile app',
    wallet: 'Wallet',
  },
  mostProbable: 'Most Probable Scenario',
  scoreFit: 'Score Fit',
  additionalRevenue: 'Additional Revenue',
  incrementalRevenue: 'Incremental Revenue',
  incrementalNetProfit: 'Incremental Net Profit',
  plan: 'Plan',
  platformCost: 'Platform cost / year',
  grossRoi: 'Gross ROI',
  netRoi: 'Incremental Net ROI',
  estimatedOver: 'Estimated over 12 months',
  perYear: '(1 year)',
  low: 'Low',
  mid: 'Mid',
  best: 'Best',
  scenarioDetails: 'Scenario details',
  totals: 'Totals',
  pricingScore: 'Pricing & Score',
  members: 'Engaged members',
  aovAfter: 'AOV after uplift',
  repAfter: 'Repeat after uplift',
  grossUplift: 'Gross uplift revenue',
  trueGross: 'True gross incremental',
  loyaltyCost: 'Loyalty rewards cost',
  loyaltyGP: 'Loyalty gross profit',
  loyaltyNP: 'Loyalty net profit',
  referralRevenue: 'Referral revenue',
  referralTrue: 'True referral incremental',
  referralOrders: 'Referral orders',
  referralCost: 'Referral rewards cost',
  referralGP: 'Referral gross profit',
  referralNP: 'Referral net profit',
  walletPasses: 'Active wallet passes',
  loyaltySection: 'Loyalty',
  referralSection: 'Referrals',
  walletSection: 'Wallet',
  totalGrossUplift: 'Total gross uplift revenue',
  revenueAfter: 'Revenue after uplift',
  totalIncremental: 'Total incremental revenue',
  incrementalAfter: 'Revenue after (incremental)',
  incrementalGP: 'Incremental gross profit',
  totalCost: 'Total rewards cost',
  totalNP: 'Total incremental net profit',
  ordersAfter: 'Orders after uplift',
  aovUplift: 'AOV uplift',
  repeatUplift: 'Repeat uplift',
  rpcUplift: 'Revenue / customer uplift',
  metricsSection: 'Metrics uplift',
  monthlyOrders: 'Monthly orders',
  autoPlan: 'Auto (from revenue)',
  customPlan: 'Custom volume',
  lite: 'Lite',
  premium: 'Premium',
  enterprise: 'Enterprise',
  walletAddon: 'Wallet add-on',
  walletPassesTiered: 'Active passes (tiered)',
  walletPriceAuto: 'Wallet price (auto)',
  walletPriceManual: 'Wallet price (custom)',
  annualPrice: 'Annual price',
  scoreFitTable: 'Score Fit',
  coefficient: 'Coefficient',
  value: 'Value',
  revenueBand: 'Revenue band',
  total: 'Total',
  annex: 'Incrementality annex',
  annexAov: 'AOV incrementality',
  annexRep: 'Repeat incrementality',
  allCustomers: 'All customers',
  bestScenario: 'Best scenario',
  minReward: 'Min. rewarded',
  incrementality: 'Incrementality',
  expiryMonths: 'Expiry (months)',
  settings: 'Settings',
  clientName: 'Client name',
  manualOrders: 'Custom monthly orders',
  manualPasses: 'Custom active passes',
  showAnnex: 'Show incrementality annex',
  glossaryTitle: 'How the model works',
  glossarySections: [
    {
      title: 'Baseline formulas',
      body: 'Yearly orders = revenue / AOV. Unique customers = yearly orders / repeat rate. Revenue per customer = revenue / unique customers.',
    },
    {
      title: 'Score Fit',
      body: 'Revenue is banded (0.25 below 500k, 0.5 below 3M, else 1) and each turned-on integration adds its coefficient; Score Fit = weighted total / 38. It selects the scenario (Low < 40% ≤ Mid < 70% ≤ Best) and is only visible in Internal mode.',
    },
    {
      title: 'Gross vs incremental & the incrementality factor',
      body: 'Gross uplift is the revenue attributed on the platform; the incrementality factor (60 / 65 / 70%) discounts it to the true incremental revenue, because some of it would have happened anyway. Worked examples: basket uplift (180−150)/(190−150) = 75%, repeat uplift 1−(30/90) = 67%, referral incrementality 1−(1%/3%) = 67%.',
    },
    {
      title: 'Loyoly Incremental Net ROI',
      body: 'Incremental net profit = (total incremental revenue × margin) − (loyalty + referral rewards cost). ROI is shown as round(net profit / platform cost) → ×N: for every £1 of platform cost, £N of incremental net profit over 12 months.',
    },
    {
      title: 'Lite vs Premium vs Enterprise',
      body: 'The plans share the same order-volume → price ladder, but higher tiers unlock more mechanics, seats and support, so a bigger share of customers can be engaged → larger uplift. The plan changes platform cost (and therefore ROI), not the gross uplift vectors.',
    },
  ],
  close: 'Close',
}

const fr: Dict = {
  appTitle: 'Pricing & ROI',
  glossary: 'Glossaire',
  reset: 'Réinitialiser',
  internal: 'Interne',
  presentation: 'Présentation',
  inputs: 'Paramètres',
  rev: "Chiffre d'affaires annuel",
  aov: 'Panier moyen (AOV)',
  recur: 'Taux de clients récurrents',
  repeat: "Taux de réachat (Wallet)",
  margin: 'Marge brute',
  rwLoy: 'Récompense fidélité',
  rwRef: 'Récompense parrainage',
  integrations: 'Intégrations',
  integrationNames: {
    checkout: 'Checkout',
    crm: 'CRM',
    pos: 'Caisse (POS)',
    social: 'Réseaux sociaux',
    reviews: 'Avis',
    whatsapp: 'WhatsApp',
    subscription: 'Abonnement',
    support: 'Support',
    mobileApp: 'App mobile',
    wallet: 'Wallet',
  },
  mostProbable: 'Scénario le plus probable',
  scoreFit: 'Score Fit',
  additionalRevenue: 'Revenu additionnel',
  incrementalRevenue: 'Revenu incrémental',
  incrementalNetProfit: 'Profit net incrémental',
  plan: 'Offre',
  platformCost: 'Coût plateforme / an',
  grossRoi: 'ROI brut',
  netRoi: 'ROI net incrémental',
  estimatedOver: 'Estimé sur 12 mois',
  perYear: '(1 an)',
  low: 'Bas',
  mid: 'Moyen',
  best: 'Élevé',
  scenarioDetails: 'Détail des scénarios',
  totals: 'Totaux',
  pricingScore: 'Tarifs & Score',
  members: 'Membres engagés',
  aovAfter: 'Panier après uplift',
  repAfter: 'Réachat après uplift',
  grossUplift: "Revenu d'uplift brut",
  trueGross: 'Vrai incrément brut',
  loyaltyCost: 'Coût récompenses fidélité',
  loyaltyGP: 'Profit brut fidélité',
  loyaltyNP: 'Profit net fidélité',
  referralRevenue: 'Revenu parrainage',
  referralTrue: 'Vrai incrément parrainage',
  referralOrders: 'Commandes parrainage',
  referralCost: 'Coût récompenses parrainage',
  referralGP: 'Profit brut parrainage',
  referralNP: 'Profit net parrainage',
  walletPasses: 'Cartes Wallet actives',
  loyaltySection: 'Fidélité',
  referralSection: 'Parrainage',
  walletSection: 'Wallet',
  totalGrossUplift: "Revenu d'uplift brut total",
  revenueAfter: 'Revenu après uplift',
  totalIncremental: 'Revenu incrémental total',
  incrementalAfter: 'Revenu après (incrémental)',
  incrementalGP: 'Profit brut incrémental',
  totalCost: 'Coût total des récompenses',
  totalNP: 'Profit net incrémental total',
  ordersAfter: 'Commandes après uplift',
  aovUplift: 'Uplift panier moyen',
  repeatUplift: 'Uplift réachat',
  rpcUplift: 'Uplift revenu / client',
  metricsSection: 'Uplift des métriques',
  monthlyOrders: 'Commandes mensuelles',
  autoPlan: 'Auto (depuis le CA)',
  customPlan: 'Volume personnalisé',
  lite: 'Lite',
  premium: 'Premium',
  enterprise: 'Enterprise',
  walletAddon: 'Option Wallet',
  walletPassesTiered: 'Cartes actives (paliers)',
  walletPriceAuto: 'Prix Wallet (auto)',
  walletPriceManual: 'Prix Wallet (custom)',
  annualPrice: 'Prix annuel',
  scoreFitTable: 'Score Fit',
  coefficient: 'Coefficient',
  value: 'Valeur',
  revenueBand: 'Palier de CA',
  total: 'Total',
  annex: "Annexe d'incrémentalité",
  annexAov: 'Incrémentalité panier',
  annexRep: 'Incrémentalité réachat',
  allCustomers: 'Tous les clients',
  bestScenario: 'Scénario élevé',
  minReward: 'Min. récompensé',
  incrementality: 'Incrémentalité',
  expiryMonths: 'Expiration (mois)',
  settings: 'Réglages',
  clientName: 'Nom du client',
  manualOrders: 'Commandes mensuelles (custom)',
  manualPasses: 'Cartes actives (custom)',
  showAnnex: "Afficher l'annexe d'incrémentalité",
  glossaryTitle: 'Fonctionnement du modèle',
  glossarySections: [
    {
      title: 'Formules de base',
      body: "Commandes annuelles = CA / panier moyen. Clients uniques = commandes annuelles / taux de réachat. Revenu par client = CA / clients uniques.",
    },
    {
      title: 'Score Fit',
      body: "Le CA est découpé en paliers (0,25 sous 500k, 0,5 sous 3M, sinon 1) et chaque intégration activée ajoute son coefficient ; Score Fit = total pondéré / 38. Il sélectionne le scénario (Bas < 40 % ≤ Moyen < 70 % ≤ Élevé) et n'est visible qu'en mode Interne.",
    },
    {
      title: "Brut vs incrémental & le facteur d'incrémentalité",
      body: "L'uplift brut est le revenu attribué sur la plateforme ; le facteur d'incrémentalité (60 / 65 / 70 %) le réduit au vrai revenu incrémental, car une partie aurait eu lieu de toute façon. Exemples : uplift panier (180−150)/(190−150) = 75 %, uplift réachat 1−(30/90) = 67 %, incrémentalité parrainage 1−(1 %/3 %) = 67 %.",
    },
    {
      title: 'ROI net incrémental Loyoly',
      body: "Profit net incrémental = (revenu incrémental total × marge) − (coût des récompenses fidélité + parrainage). Le ROI est affiché en round(profit net / coût plateforme) → ×N : pour 1 € de coût plateforme, N € de profit net incrémental sur 12 mois.",
    },
    {
      title: 'Lite vs Premium vs Enterprise',
      body: "Les offres partagent la même grille volume de commandes → prix, mais les paliers supérieurs débloquent plus de mécaniques, de sièges et de support, donc une plus grande part de clients peut être engagée → uplift plus élevé. L'offre change le coût plateforme (et donc le ROI), pas les vecteurs d'uplift brut.",
    },
  ],
  close: 'Fermer',
}

const es: Dict = {
  appTitle: 'Pricing y ROI',
  glossary: 'Glosario',
  reset: 'Restablecer',
  internal: 'Interno',
  presentation: 'Presentación',
  inputs: 'Parámetros',
  rev: 'Ingresos anuales',
  aov: 'Ticket medio (AOV)',
  recur: 'Tasa de clientes recurrentes',
  repeat: 'Tasa de recompra (Wallet)',
  margin: 'Margen bruto',
  rwLoy: 'Recompensa fidelidad',
  rwRef: 'Recompensa referidos',
  integrations: 'Integraciones',
  integrationNames: {
    checkout: 'Checkout',
    crm: 'CRM',
    pos: 'TPV (POS)',
    social: 'Redes sociales',
    reviews: 'Reseñas',
    whatsapp: 'WhatsApp',
    subscription: 'Suscripción',
    support: 'Soporte',
    mobileApp: 'App móvil',
    wallet: 'Wallet',
  },
  mostProbable: 'Escenario más probable',
  scoreFit: 'Score Fit',
  additionalRevenue: 'Ingresos adicionales',
  incrementalRevenue: 'Ingresos incrementales',
  incrementalNetProfit: 'Beneficio neto incremental',
  plan: 'Plan',
  platformCost: 'Coste plataforma / año',
  grossRoi: 'ROI bruto',
  netRoi: 'ROI neto incremental',
  estimatedOver: 'Estimado a 12 meses',
  perYear: '(1 año)',
  low: 'Bajo',
  mid: 'Medio',
  best: 'Alto',
  scenarioDetails: 'Detalle de escenarios',
  totals: 'Totales',
  pricingScore: 'Precios y Score',
  members: 'Miembros activos',
  aovAfter: 'Ticket tras uplift',
  repAfter: 'Recompra tras uplift',
  grossUplift: 'Ingreso de uplift bruto',
  trueGross: 'Incremento bruto real',
  loyaltyCost: 'Coste recompensas fidelidad',
  loyaltyGP: 'Beneficio bruto fidelidad',
  loyaltyNP: 'Beneficio neto fidelidad',
  referralRevenue: 'Ingresos referidos',
  referralTrue: 'Incremento real referidos',
  referralOrders: 'Pedidos referidos',
  referralCost: 'Coste recompensas referidos',
  referralGP: 'Beneficio bruto referidos',
  referralNP: 'Beneficio neto referidos',
  walletPasses: 'Pases Wallet activos',
  loyaltySection: 'Fidelidad',
  referralSection: 'Referidos',
  walletSection: 'Wallet',
  totalGrossUplift: 'Ingreso de uplift bruto total',
  revenueAfter: 'Ingresos tras uplift',
  totalIncremental: 'Ingresos incrementales totales',
  incrementalAfter: 'Ingresos tras (incremental)',
  incrementalGP: 'Beneficio bruto incremental',
  totalCost: 'Coste total de recompensas',
  totalNP: 'Beneficio neto incremental total',
  ordersAfter: 'Pedidos tras uplift',
  aovUplift: 'Uplift ticket medio',
  repeatUplift: 'Uplift recompra',
  rpcUplift: 'Uplift ingreso / cliente',
  metricsSection: 'Uplift de métricas',
  monthlyOrders: 'Pedidos mensuales',
  autoPlan: 'Auto (desde ingresos)',
  customPlan: 'Volumen personalizado',
  lite: 'Lite',
  premium: 'Premium',
  enterprise: 'Enterprise',
  walletAddon: 'Complemento Wallet',
  walletPassesTiered: 'Pases activos (tramos)',
  walletPriceAuto: 'Precio Wallet (auto)',
  walletPriceManual: 'Precio Wallet (custom)',
  annualPrice: 'Precio anual',
  scoreFitTable: 'Score Fit',
  coefficient: 'Coeficiente',
  value: 'Valor',
  revenueBand: 'Tramo de ingresos',
  total: 'Total',
  annex: 'Anexo de incrementalidad',
  annexAov: 'Incrementalidad ticket',
  annexRep: 'Incrementalidad recompra',
  allCustomers: 'Todos los clientes',
  bestScenario: 'Escenario alto',
  minReward: 'Mín. recompensado',
  incrementality: 'Incrementalidad',
  expiryMonths: 'Caducidad (meses)',
  settings: 'Ajustes',
  clientName: 'Nombre del cliente',
  manualOrders: 'Pedidos mensuales (custom)',
  manualPasses: 'Pases activos (custom)',
  showAnnex: 'Mostrar anexo de incrementalidad',
  glossaryTitle: 'Cómo funciona el modelo',
  glossarySections: [
    {
      title: 'Fórmulas base',
      body: 'Pedidos anuales = ingresos / ticket medio. Clientes únicos = pedidos anuales / tasa de recompra. Ingreso por cliente = ingresos / clientes únicos.',
    },
    {
      title: 'Score Fit',
      body: 'Los ingresos se dividen en tramos (0,25 bajo 500k, 0,5 bajo 3M, si no 1) y cada integración activada suma su coeficiente; Score Fit = total ponderado / 38. Selecciona el escenario (Bajo < 40 % ≤ Medio < 70 % ≤ Alto) y solo es visible en modo Interno.',
    },
    {
      title: 'Bruto vs incremental y el factor de incrementalidad',
      body: 'El uplift bruto es el ingreso atribuido en la plataforma; el factor de incrementalidad (60 / 65 / 70 %) lo reduce al ingreso incremental real, porque parte habría ocurrido igualmente. Ejemplos: uplift de cesta (180−150)/(190−150) = 75 %, uplift de recompra 1−(30/90) = 67 %, incrementalidad de referidos 1−(1 %/3 %) = 67 %.',
    },
    {
      title: 'ROI neto incremental Loyoly',
      body: 'Beneficio neto incremental = (ingreso incremental total × margen) − (coste recompensas fidelidad + referidos). El ROI se muestra como round(beneficio neto / coste plataforma) → ×N: por cada 1 € de coste de plataforma, N € de beneficio neto incremental a 12 meses.',
    },
    {
      title: 'Lite vs Premium vs Enterprise',
      body: 'Los planes comparten la misma escala volumen de pedidos → precio, pero los tramos superiores desbloquean más mecánicas, asientos y soporte, así que una mayor parte de clientes puede activarse → mayor uplift. El plan cambia el coste de plataforma (y por tanto el ROI), no los vectores de uplift bruto.',
    },
  ],
  close: 'Cerrar',
}

export const T: Record<Lang, Dict> = { fr, en, es }
