'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.activities': 'Activities',
    'nav.community': 'Community',
    'nav.learning': 'Learning',
    'nav.crisis': 'Crisis Support',
    
    // Common
    'common.welcome': 'Welcome',
    'common.goodMorning': 'Good morning',
    'common.goodAfternoon': 'Good afternoon',
    'common.goodEvening': 'Good evening',
    'common.start': 'Start',
    'common.learnMore': 'Learn more',
    'common.getStarted': 'Get Started',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.complete': 'Complete',
    'common.continue': 'Continue',
    
    // Dashboard
    'dashboard.title': 'Welcome to your wellness journey',
    'dashboard.subtitle': 'Here\'s your personalized mental health dashboard',
    'dashboard.howAreYou': 'How are you feeling today?',
    'dashboard.moodCheck': 'Daily Mood Check',
    'dashboard.moodCheckDesc': 'Track your emotional state and identify patterns',
    'dashboard.wellnessSurvey': 'Wellness Survey',
    'dashboard.wellnessSurveyDesc': 'Complete personalized assessments and get insights',
    'dashboard.talkToSomeone': 'Talk to Someone',
    'dashboard.talkToSomeoneDesc': 'Connect with mental health professionals or peers',
    'dashboard.crisisSupport': 'Crisis Support',
    'dashboard.crisisSupportDesc': '24/7 emergency resources and immediate help',
    'dashboard.guidedActivities': 'Guided Activities',
    'dashboard.guidedActivitiesDesc': 'Meditation, breathing exercises, and mindfulness',
    'dashboard.learningHub': 'Learning Hub',
    'dashboard.learningHubDesc': 'Educational content and mental health resources',
    
    // Mood Tracker
    'mood.veryLow': 'Very Low',
    'mood.low': 'Low',
    'mood.neutral': 'Neutral',
    'mood.good': 'Good',
    'mood.great': 'Great',
    'mood.feelingDown': 'Feeling very down',
    'mood.feelingLow': 'Feeling low',
    'mood.feelingOkay': 'Feeling okay',
    'mood.feelingGood': 'Feeling good',
    'mood.feelingGreat': 'Feeling great',
    
    // Activities
    'activities.meditation': 'Meditation',
    'activities.breathing': 'Breathing Exercises',
    'activities.journaling': 'Journaling',
    'activities.movement': 'Gentle Movement',
    'activities.duration': 'Duration',
    'activities.difficulty': 'Difficulty',
    'activities.points': 'Points',
    'activities.beginner': 'Beginner',
    'activities.intermediate': 'Intermediate',
    'activities.advanced': 'Advanced',
    
    // Community
    'community.title': 'Community Support',
    'community.subtitle': 'Connect with others on their mental wellness journey',
    'community.newPost': 'New Post',
    'community.search': 'Search posts...',
    'community.categories': 'Categories',
    'community.general': 'General Discussion',
    'community.anxiety': 'Anxiety Support',
    'community.depression': 'Depression Support',
    'community.recovery': 'Recovery Stories',
    
    // Learning
    'learning.title': 'Learning Hub',
    'learning.subtitle': 'Educational content and resources for your mental wellness journey',
    'learning.featured': 'Featured Content',
    'learning.categories': 'Explore by Category',
    'learning.quickReads': 'Quick Reads & Micro-Learning',
    'learning.interactive': 'Interactive Tools & Assessments',
    
    // Crisis
    'crisis.title': 'Crisis Support',
    'crisis.subtitle': 'Immediate help and resources when you need them most',
    'crisis.immediateCrisis': 'In Immediate Crisis?',
    'crisis.call988': 'Call 988 Now',
    'crisis.text741741': 'Text HOME to 741741',
    'crisis.emergencyResources': 'Emergency Resources',
    'crisis.copingStrategies': 'Immediate Coping Strategies',
    'crisis.safetyPlanning': 'Safety Planning',
    'crisis.warningSigns': 'Warning Signs to Watch For',
    
    // Points System
    'points.mindPoints': 'Mind Points',
    'points.wellnessJourney': 'Your wellness journey progress',
    'points.totalPoints': 'Total Points',
    'points.thisWeek': 'This Week',
    'points.dayStreak': 'Day Streak',
    'points.level': 'Level',
    'points.achievements': 'Achievements',
    'points.howToEarn': 'How to Earn Points',
    'points.logMood': 'Log daily mood',
    'points.meditation': 'Complete meditation',
    'points.journal': 'Write journal entry',
    'points.helpCommunity': 'Help community member',
    'points.learning': 'Complete learning module',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.dashboard': 'Panel',
    'nav.activities': 'Actividades',
    'nav.community': 'Comunidad',
    'nav.learning': 'Aprendizaje',
    'nav.crisis': 'Apoyo en Crisis',
    
    // Common
    'common.welcome': 'Bienvenido',
    'common.goodMorning': 'Buenos días',
    'common.goodAfternoon': 'Buenas tardes',
    'common.goodEvening': 'Buenas noches',
    'common.start': 'Comenzar',
    'common.learnMore': 'Saber más',
    'common.getStarted': 'Comenzar',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.close': 'Cerrar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.complete': 'Completar',
    'common.continue': 'Continuar',
    
    // Dashboard
    'dashboard.title': 'Bienvenido a tu viaje de bienestar',
    'dashboard.subtitle': 'Aquí está tu panel personalizado de salud mental',
    'dashboard.howAreYou': '¿Cómo te sientes hoy?',
    'dashboard.moodCheck': 'Verificación Diaria del Estado de Ánimo',
    'dashboard.moodCheckDesc': 'Rastrea tu estado emocional e identifica patrones',
    'dashboard.wellnessSurvey': 'Encuesta de Bienestar',
    'dashboard.wellnessSurveyDesc': 'Completa evaluaciones personalizadas y obtén información',
    'dashboard.talkToSomeone': 'Hablar con Alguien',
    'dashboard.talkToSomeoneDesc': 'Conecta con profesionales de salud mental o compañeros',
    'dashboard.crisisSupport': 'Apoyo en Crisis',
    'dashboard.crisisSupportDesc': 'Recursos de emergencia 24/7 y ayuda inmediata',
    'dashboard.guidedActivities': 'Actividades Guiadas',
    'dashboard.guidedActivitiesDesc': 'Meditación, ejercicios de respiración y mindfulness',
    'dashboard.learningHub': 'Centro de Aprendizaje',
    'dashboard.learningHubDesc': 'Contenido educativo y recursos de salud mental',
    
    // Mood Tracker
    'mood.veryLow': 'Muy Bajo',
    'mood.low': 'Bajo',
    'mood.neutral': 'Neutral',
    'mood.good': 'Bueno',
    'mood.great': 'Excelente',
    'mood.feelingDown': 'Sintiéndose muy deprimido',
    'mood.feelingLow': 'Sintiéndose bajo',
    'mood.feelingOkay': 'Sintiéndose bien',
    'mood.feelingGood': 'Sintiéndose bueno',
    'mood.feelingGreat': 'Sintiéndose excelente',
    
    // Activities
    'activities.meditation': 'Meditación',
    'activities.breathing': 'Ejercicios de Respiración',
    'activities.journaling': 'Diario',
    'activities.movement': 'Movimiento Suave',
    'activities.duration': 'Duración',
    'activities.difficulty': 'Dificultad',
    'activities.points': 'Puntos',
    'activities.beginner': 'Principiante',
    'activities.intermediate': 'Intermedio',
    'activities.advanced': 'Avanzado',
    
    // Community
    'community.title': 'Apoyo Comunitario',
    'community.subtitle': 'Conecta con otros en su viaje de bienestar mental',
    'community.newPost': 'Nueva Publicación',
    'community.search': 'Buscar publicaciones...',
    'community.categories': 'Categorías',
    'community.general': 'Discusión General',
    'community.anxiety': 'Apoyo para Ansiedad',
    'community.depression': 'Apoyo para Depresión',
    'community.recovery': 'Historias de Recuperación',
    
    // Learning
    'learning.title': 'Centro de Aprendizaje',
    'learning.subtitle': 'Contenido educativo y recursos para tu viaje de bienestar mental',
    'learning.featured': 'Contenido Destacado',
    'learning.categories': 'Explorar por Categoría',
    'learning.quickReads': 'Lecturas Rápidas y Micro-Aprendizaje',
    'learning.interactive': 'Herramientas Interactivas y Evaluaciones',
    
    // Crisis
    'crisis.title': 'Apoyo en Crisis',
    'crisis.subtitle': 'Ayuda inmediata y recursos cuando más los necesitas',
    'crisis.immediateCrisis': '¿En Crisis Inmediata?',
    'crisis.call988': 'Llamar al 988 Ahora',
    'crisis.text741741': 'Enviar HOME al 741741',
    'crisis.emergencyResources': 'Recursos de Emergencia',
    'crisis.copingStrategies': 'Estrategias de Afrontamiento Inmediatas',
    'crisis.safetyPlanning': 'Planificación de Seguridad',
    'crisis.warningSigns': 'Señales de Advertencia a Observar',
    
    // Points System
    'points.mindPoints': 'Puntos Mentales',
    'points.wellnessJourney': 'El progreso de tu viaje de bienestar',
    'points.totalPoints': 'Puntos Totales',
    'points.thisWeek': 'Esta Semana',
    'points.dayStreak': 'Racha Diaria',
    'points.level': 'Nivel',
    'points.achievements': 'Logros',
    'points.howToEarn': 'Cómo Ganar Puntos',
    'points.logMood': 'Registrar estado de ánimo diario',
    'points.meditation': 'Completar meditación',
    'points.journal': 'Escribir entrada de diario',
    'points.helpCommunity': 'Ayudar a miembro de la comunidad',
    'points.learning': 'Completar módulo de aprendizaje',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.dashboard': 'Tableau de bord',
    'nav.activities': 'Activités',
    'nav.community': 'Communauté',
    'nav.learning': 'Apprentissage',
    'nav.crisis': 'Soutien en Crise',
    
    // Common
    'common.welcome': 'Bienvenue',
    'common.goodMorning': 'Bonjour',
    'common.goodAfternoon': 'Bon après-midi',
    'common.goodEvening': 'Bonsoir',
    'common.start': 'Commencer',
    'common.learnMore': 'En savoir plus',
    'common.getStarted': 'Commencer',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.complete': 'Terminer',
    'common.continue': 'Continuer',
    
    // Dashboard
    'dashboard.title': 'Bienvenue dans votre parcours de bien-être',
    'dashboard.subtitle': 'Voici votre tableau de bord personnalisé de santé mentale',
    'dashboard.howAreYou': 'Comment vous sentez-vous aujourd\'hui ?',
    'dashboard.moodCheck': 'Vérification Quotidienne de l\'Humeur',
    'dashboard.moodCheckDesc': 'Suivez votre état émotionnel et identifiez les modèles',
    'dashboard.wellnessSurvey': 'Enquête sur le Bien-être',
    'dashboard.wellnessSurveyDesc': 'Complétez des évaluations personnalisées et obtenez des insights',
    'dashboard.talkToSomeone': 'Parler à Quelqu\'un',
    'dashboard.talkToSomeoneDesc': 'Connectez-vous avec des professionnels de la santé mentale ou des pairs',
    'dashboard.crisisSupport': 'Soutien en Crise',
    'dashboard.crisisSupportDesc': 'Ressources d\'urgence 24/7 et aide immédiate',
    'dashboard.guidedActivities': 'Activités Guidées',
    'dashboard.guidedActivitiesDesc': 'Méditation, exercices de respiration et pleine conscience',
    'dashboard.learningHub': 'Centre d\'Apprentissage',
    'dashboard.learningHubDesc': 'Contenu éducatif et ressources de santé mentale',
    
    // Mood Tracker
    'mood.veryLow': 'Très Bas',
    'mood.low': 'Bas',
    'mood.neutral': 'Neutre',
    'mood.good': 'Bien',
    'mood.great': 'Excellent',
    'mood.feelingDown': 'Se sentir très déprimé',
    'mood.feelingLow': 'Se sentir bas',
    'mood.feelingOkay': 'Se sentir bien',
    'mood.feelingGood': 'Se sentir bon',
    'mood.feelingGreat': 'Se sentir excellent',
    
    // Activities
    'activities.meditation': 'Méditation',
    'activities.breathing': 'Exercices de Respiration',
    'activities.journaling': 'Journal',
    'activities.movement': 'Mouvement Doux',
    'activities.duration': 'Durée',
    'activities.difficulty': 'Difficulté',
    'activities.points': 'Points',
    'activities.beginner': 'Débutant',
    'activities.intermediate': 'Intermédiaire',
    'activities.advanced': 'Avancé',
    
    // Community
    'community.title': 'Soutien Communautaire',
    'community.subtitle': 'Connectez-vous avec d\'autres dans leur parcours de bien-être mental',
    'community.newPost': 'Nouveau Post',
    'community.search': 'Rechercher des posts...',
    'community.categories': 'Catégories',
    'community.general': 'Discussion Générale',
    'community.anxiety': 'Soutien Anxiété',
    'community.depression': 'Soutien Dépression',
    'community.recovery': 'Histoires de Récupération',
    
    // Learning
    'learning.title': 'Centre d\'Apprentissage',
    'learning.subtitle': 'Contenu éducatif et ressources pour votre parcours de bien-être mental',
    'learning.featured': 'Contenu en Vedette',
    'learning.categories': 'Explorer par Catégorie',
    'learning.quickReads': 'Lectures Rapides et Micro-Apprentissage',
    'learning.interactive': 'Outils Interactifs et Évaluations',
    
    // Crisis
    'crisis.title': 'Soutien en Crise',
    'crisis.subtitle': 'Aide immédiate et ressources quand vous en avez le plus besoin',
    'crisis.immediateCrisis': 'En Crise Immédiate ?',
    'crisis.call988': 'Appeler le 988 Maintenant',
    'crisis.text741741': 'Envoyer HOME au 741741',
    'crisis.emergencyResources': 'Ressources d\'Urgence',
    'crisis.copingStrategies': 'Stratégies d\'Adaptation Immédiates',
    'crisis.safetyPlanning': 'Planification de Sécurité',
    'crisis.warningSigns': 'Signes d\'Avertissement à Surveiller',
    
    // Points System
    'points.mindPoints': 'Points Mentaux',
    'points.wellnessJourney': 'Le progrès de votre parcours de bien-être',
    'points.totalPoints': 'Points Totaux',
    'points.thisWeek': 'Cette Semaine',
    'points.dayStreak': 'Série Quotidienne',
    'points.level': 'Niveau',
    'points.achievements': 'Réalisations',
    'points.howToEarn': 'Comment Gagner des Points',
    'points.logMood': 'Enregistrer l\'humeur quotidienne',
    'points.meditation': 'Compléter la méditation',
    'points.journal': 'Écrire une entrée de journal',
    'points.helpCommunity': 'Aider un membre de la communauté',
    'points.learning': 'Compléter le module d\'apprentissage',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations[typeof language]] || key
  }

  const handleSetLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
