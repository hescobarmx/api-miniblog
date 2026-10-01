-- ============================================
-- MiniBlog - Seed
-- ============================================

-- Authors

INSERT INTO authors (name, email, bio)
VALUES
    (
        'Ana García',
        'ana.garcia@example.com',
        'Escritora especializada en tecnología y desarrollo web.'
    ),
    (
        'Carlos López',
        'carlos.lopez@example.com',
        'Desarrollador y escritor sobre software y productividad.'
    ),
    (
        'María Rodríguez',
        'maria.rodriguez@example.com',
        'Autora sobre tecnología y cultura digital.'
    );


-- Posts

INSERT INTO posts (author_id, title, content, published)
VALUES
    (
        1,
        'Introducción al desarrollo web',
        'Una introducción a los conceptos fundamentales del desarrollo web.',
        TRUE
    ),
    (
        1,
        'Buenas prácticas para programadores',
        'Algunas recomendaciones para mejorar la calidad del código.',
        TRUE
    ),
    (
        2,
        'Cómo organizar un proyecto de software',
        'Una guía básica para estructurar correctamente un proyecto.',
        TRUE
    ),
    (
        2,
        'Productividad para desarrolladores',
        'Estrategias para organizar mejor el trabajo durante el desarrollo.',
        FALSE
    ),
    (
        3,
        'El futuro de la tecnología',
        'Una reflexión sobre la evolución de la tecnología y su impacto.',
        TRUE
    );