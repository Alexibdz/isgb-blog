// Carga datos de ejemplo usando la Local API de Payload (que por defecto ignora
// access control, ideal para scripts de seed).
//
// Dos formas de correrlo:
//   npm run seed                          (script standalone con tsx)
//   POST http://localhost:3000/api/dev-seed  (vía el propio server de Next,
//     útil en Windows si "npm run seed" pega con el bug de tsx + Node 24
//     que rompe la carga de payload.config.ts fuera de Next — ver
//     https://github.com/payloadcms/payload/issues/16378)
import type { Payload } from 'payload'

export const seedDatos = async (payload: Payload) => {
  const { totalDocs: yaHayUsuarios } = await payload.count({ collection: 'usuarios' })
  if (yaHayUsuarios === 0) {
    await payload.create({
      collection: 'usuarios',
      data: {
        email: 'admin@isgbenavento.edu.ar',
        password: 'CambiarPassword123!',
        nombre: 'Admin ISGB',
        rol: 'admin',
      },
    })
    payload.logger.info('Usuario admin creado: admin@isgbenavento.edu.ar / CambiarPassword123!')
  }

  const admin = await payload.find({
    collection: 'usuarios',
    where: { rol: { equals: 'admin' } },
    limit: 1,
  })
  const autorId = admin.docs[0]?.id

  const carrerasData = [
    {
      nombre: 'Tecnicatura Superior en Enfermería',
      slug: 'enfermeria',
      duracion: '3 años',
      descripcion:
        'Formación práctica en instituciones de salud desde segundo año, con simulación clínica en el instituto.',
      planEstudios: materiasPorAnio([
        ['Anatomía y Fisiología', 'Enfermería Básica', 'Psicología Evolutiva', 'Salud Pública'],
        ['Enfermería Clínica', 'Farmacología', 'Nutrición y Dietética', 'Primeros Auxilios'],
        [
          'Enfermería Materno-Infantil',
          'Enfermería en Salud Mental',
          'Práctica Profesionalizante',
          'Legislación Sanitaria',
        ],
      ]),
    },
    {
      nombre: 'Tecnicatura Superior en Desarrollo de Software',
      slug: 'desarrollo-de-software',
      duracion: '3 años',
      descripcion:
        'Programación, bases de datos y proyectos reales junto a empresas tecnológicas de la zona.',
      planEstudios: materiasPorAnio([
        ['Introducción a la Programación', 'Matemática Discreta', 'Bases de Datos I', 'Sistemas Operativos'],
        ['Programación Orientada a Objetos', 'Bases de Datos II', 'Desarrollo Web', 'Estructuras de Datos'],
        ['Desarrollo Móvil', 'Ingeniería de Software', 'Proyecto Final', 'Seguridad Informática'],
      ]),
    },
    {
      nombre: 'Profesorado de Educación Inicial',
      slug: 'educacion-inicial',
      duracion: '4 años',
      descripcion:
        'Prácticas docentes desde el segundo año en jardines y escuelas asociadas al instituto.',
      planEstudios: materiasPorAnio([
        ['Pedagogía', 'Psicología del Desarrollo', 'Didáctica General', 'Prácticas del Lenguaje'],
        ['Didáctica de la Educación Inicial', 'Literatura Infantil', 'Educación por el Arte', 'Práctica Docente I'],
        ['Juego y Educación Inicial', 'Educación Sexual Integral', 'Matemática y su Didáctica', 'Práctica Docente II'],
        ['Residencia Docente', 'Proyectos Institucionales', 'Educación Inclusiva', 'Trabajo Final'],
      ]),
    },
    {
      nombre: 'Tecnicatura Superior en Administración de Empresas',
      slug: 'administracion-de-empresas',
      duracion: '2 años',
      descripcion: 'Gestión, finanzas y liderazgo de equipos, pensada para compatibilizar con el trabajo.',
      planEstudios: materiasPorAnio([
        ['Contabilidad Básica', 'Matemática Financiera', 'Organización de Empresas', 'Derecho Comercial'],
        ['Gestión de Recursos Humanos', 'Marketing', 'Costos y Presupuestos', 'Liderazgo y Trabajo en Equipo'],
      ]),
    },
    {
      nombre: 'Tecnicatura Superior en Diseño Gráfico',
      slug: 'diseno-grafico',
      duracion: '3 años',
      descripcion: 'Identidad visual, producción digital y un portfolio profesional al finalizar la carrera.',
      planEstudios: materiasPorAnio([
        ['Dibujo y Morfología', 'Historia del Diseño', 'Color', 'Tipografía I'],
        ['Diseño Editorial', 'Fotografía', 'Tipografía II', 'Diseño Digital'],
        ['Identidad Visual', 'Diseño Publicitario', 'Portfolio Profesional', 'Práctica Profesionalizante'],
      ]),
    },
    {
      nombre: 'Tecnicatura Superior en Turismo',
      slug: 'turismo',
      duracion: '2 años',
      descripcion: 'Gestión de destinos y servicios turísticos con salidas de campo incluidas en la cursada.',
      planEstudios: materiasPorAnio([
        ['Geografía Turística', 'Introducción al Turismo', 'Idioma Inglés I', 'Patrimonio Cultural'],
        ['Gestión de Servicios Turísticos', 'Idioma Inglés II', 'Marketing Turístico', 'Salidas de Campo'],
      ]),
    },
  ]

  const carreraIds: Record<string, number | string> = {}
  for (const carrera of carrerasData) {
    const existente = await payload.find({
      collection: 'carreras',
      where: { slug: { equals: carrera.slug } },
      limit: 1,
    })
    const doc =
      existente.docs[0] ?? (await payload.create({ collection: 'carreras', data: carrera }))
    carreraIds[carrera.slug] = doc.id
  }

  const tagsData = [
    { nombre: 'Vida estudiantil', slug: 'vida-estudiantil' },
    { nombre: 'Docencia', slug: 'docencia' },
    { nombre: 'Tecnología', slug: 'tecnologia' },
    { nombre: 'Egresados', slug: 'egresados' },
    { nombre: 'Eventos', slug: 'eventos' },
    { nombre: 'Orientación', slug: 'orientacion' },
  ]

  const tagIds: Record<string, number | string> = {}
  for (const tag of tagsData) {
    const existente = await payload.find({
      collection: 'tags',
      where: { slug: { equals: tag.slug } },
      limit: 1,
    })
    const doc = existente.docs[0] ?? (await payload.create({ collection: 'tags', data: tag }))
    tagIds[tag.slug] = doc.id
  }

  const noticiasData = [
    {
      titulo:
        'El instituto firmó un convenio con el Ministerio de Salud para prácticas profesionales',
      slug: 'convenio-ministerio-salud',
      bajada:
        'El acuerdo permitirá que estudiantes de Enfermería realicen pasantías rentadas en cinco centros de salud de la región.',
      contenido:
        'El acuerdo permitirá que estudiantes de Enfermería realicen pasantías rentadas en cinco centros de salud de la región a partir del segundo cuatrimestre.',
      categoria: 'institucionales' as const,
      audiencia: 'general' as const,
      publicadoEn: '2026-08-05',
    },
    {
      titulo: 'Comenzó la inscripción 2026 para todas las tecnicaturas',
      slug: 'inscripcion-2026-abierta',
      bajada: 'Las inscripciones están abiertas para las 8 tecnicaturas y profesorados.',
      contenido: 'Las inscripciones están abiertas para las 8 tecnicaturas y profesorados.',
      categoria: 'ultimo_momento' as const,
      audiencia: 'general' as const,
      publicadoEn: '2026-08-02',
    },
    {
      titulo: 'Estudiantes del profesorado participaron de las Jornadas Provinciales de Educación',
      slug: 'jornadas-provinciales-educacion',
      bajada: 'Una delegación del profesorado presentó proyectos de prácticas docentes.',
      contenido: 'Una delegación del profesorado presentó proyectos de prácticas docentes.',
      categoria: 'academicas' as const,
      audiencia: 'general' as const,
      publicadoEn: '2026-07-28',
    },
    {
      titulo: 'Cambios en las mesas de finales de agosto — solo para alumnado regular',
      slug: 'cambios-mesas-finales-agosto',
      bajada: 'Se reprogramaron algunas mesas de finales. Revisá el detalle por carrera.',
      contenido: 'Se reprogramaron algunas mesas de finales. Revisá el detalle por carrera.',
      categoria: 'academicas' as const,
      audiencia: 'alumnado' as const,
      publicadoEn: '2026-08-08',
    },
  ]

  for (const noticia of noticiasData) {
    const existente = await payload.find({
      collection: 'noticias',
      where: { slug: { equals: noticia.slug } },
      limit: 1,
    })
    if (!existente.docs[0]) {
      await payload.create({ collection: 'noticias', data: { ...noticia, autor: autorId } })
    }
  }

  const posteosData = [
    {
      titulo: 'Cómo elegir tu tecnicatura: 5 preguntas antes de anotarte',
      slug: 'como-elegir-tu-tecnicatura',
      extracto: 'Una guía corta para pensar la elección de carrera más allá del folleto.',
      contenido:
        'Elegir una tecnicatura no es solo mirar la duración: conviene preguntarse dónde te imaginás haciendo las prácticas, y con qué docentes vas a cursar. En esta nota repasamos las cinco preguntas que le hacemos a cada aspirante en la entrevista de orientación.',
      tags: ['vida-estudiantil', 'orientacion'],
      carrera: null,
      estado: 'publicado' as const,
      publicadoEn: '2026-08-03',
    },
    {
      titulo: 'Egresados que hoy lideran equipos de salud en la región',
      slug: 'egresados-lideran-equipos-de-salud',
      extracto: 'Tres historias de exalumnas de Enfermería, diez años después de graduarse.',
      contenido:
        'Tres historias de exalumnas de Enfermería, diez años después de graduarse: cómo llegaron a liderar equipos en hospitales y centros de salud de la región.',
      tags: ['egresados'],
      carrera: carreraIds['enfermeria'],
      estado: 'publicado' as const,
      publicadoEn: '2026-07-30',
    },
    {
      titulo: 'Herramientas gratuitas para practicar diseño gráfico',
      slug: 'herramientas-gratuitas-diseno-grafico',
      extracto: 'Cinco programas y sitios que recomiendan los docentes de la tecnicatura.',
      contenido:
        'Cinco programas y sitios gratuitos que recomiendan los docentes de la tecnicatura para practicar fuera del horario de cursada.',
      tags: ['tecnologia'],
      carrera: carreraIds['diseno-grafico'],
      estado: 'publicado' as const,
      publicadoEn: '2026-07-27',
    },
    {
      titulo: 'Así se vivieron las Jornadas de Puertas Abiertas 2026',
      slug: 'jornadas-puertas-abiertas-2026',
      extracto: 'Familias y futuros estudiantes recorrieron los talleres de todas las carreras.',
      contenido:
        'Familias y futuros estudiantes recorrieron los talleres de todas las carreras durante la Jornada de Puertas Abiertas de este año.',
      tags: ['eventos', 'vida-estudiantil'],
      carrera: null,
      estado: 'publicado' as const,
      publicadoEn: '2026-07-22',
    },
    {
      titulo: 'Consejos de nuestros docentes para el primer año',
      slug: 'consejos-docentes-primer-anio',
      extracto: 'Qué esperar de la cursada y cómo organizarse desde la primera semana.',
      contenido:
        'Qué esperar de la cursada y cómo organizarse desde la primera semana, según los docentes que acompañan a los ingresantes todos los años.',
      tags: ['docencia'],
      carrera: null,
      estado: 'publicado' as const,
      publicadoEn: '2026-07-18',
    },
    {
      titulo: 'Prácticas profesionalizantes: qué son y por qué importan',
      slug: 'practicas-profesionalizantes',
      extracto: 'Cómo se organizan las pasantías en cada carrera y quién las supervisa.',
      contenido:
        'Cómo se organizan las pasantías en cada carrera, quién las supervisa y qué pasa si una institución asociada no tiene vacantes ese cuatrimestre.',
      tags: ['vida-estudiantil', 'docencia'],
      carrera: null,
      estado: 'publicado' as const,
      publicadoEn: '2026-07-15',
    },
  ]

  for (const posteo of posteosData) {
    const existente = await payload.find({
      collection: 'posteos',
      where: { slug: { equals: posteo.slug } },
      limit: 1,
    })
    if (!existente.docs[0]) {
      await payload.create({
        collection: 'posteos',
        data: {
          titulo: posteo.titulo,
          slug: posteo.slug,
          extracto: posteo.extracto,
          contenido: posteo.contenido,
          tags: posteo.tags.map((slug) => tagIds[slug]),
          carrera: posteo.carrera ?? undefined,
          estado: posteo.estado,
          autor: autorId,
          publicadoEn: posteo.publicadoEn,
        },
      })
    }
  }

  payload.logger.info('Seed completo: carreras, tags, noticias y posteos de ejemplo cargados.')

  return {
    carreras: Object.keys(carreraIds).length,
    tags: Object.keys(tagIds).length,
    noticias: noticiasData.length,
    posteos: posteosData.length,
  }
}

function materiasPorAnio(anios: string[][]) {
  return anios.map((materias) => ({
    materias: materias.map((nombre) => ({ nombre })),
  }))
}

