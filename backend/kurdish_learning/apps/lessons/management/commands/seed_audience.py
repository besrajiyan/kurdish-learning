"""
python manage.py seed_audience
Tags existing data with audience and adds adult-specific content.
"""
from django.core.management.base import BaseCommand
from kurdish_learning.apps.lessons.models import Category, Lesson, Word
from kurdish_learning.apps.exercises.models import Exercise, Choice


class Command(BaseCommand):
    help = 'Tags existing lessons with audience and adds adult content'

    def handle(self, *args, **kwargs):
        self.stdout.write('🏷️ Tagging existing lessons...')
        self._tag_existing()
        self.stdout.write('📖 Creating adult lessons...')
        self._create_adult_greetings()
        self._create_adult_grammar_basics()
        self._create_adult_daily_life()
        self._create_adult_culture()
        self._create_adult_travel()
        self._create_adult_work()
        self.stdout.write(self.style.SUCCESS('✅ Audience data ready!'))

    def _tag_existing(self):
        """Tag existing categories and lessons as child-friendly."""
        child_cats = ['Ajal', 'Reng', 'Hejmar', 'Malbat']
        Category.objects.filter(name_kmr__in=child_cats).update(audience='child')

        both_cats = ['Silav', 'Laş', 'Xwarin']
        Category.objects.filter(name_kmr__in=both_cats).update(audience='both')

        # Tag child-level lessons
        Lesson.objects.filter(level__lte=2, category__audience='child').update(audience='child')
        self.stdout.write('  ✅ Existing data tagged')

    def _make_exercises(self, lesson, exercises_data):
        for i, ex in enumerate(exercises_data):
            obj = Exercise.objects.create(
                lesson=lesson, exercise_type='multiple_choice',
                question_lang=ex['lang'], question=ex['q'],
                order=i + 1, stars=ex.get('stars', 1),
            )
            for text, correct in ex['choices']:
                Choice.objects.create(
                    exercise=obj,
                    lang=ex.get('choice_lang', ex['lang']),
                    text=text, is_correct=correct,
                )

    def _create_adult_greetings(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Silav & Nasandin',
            defaults={'name_de': 'Begrussungen & Vorstellung', 'name_en': 'Greetings & Introductions',
                      'icon': '🤝', 'order': 10, 'audience': 'adult'}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Silav û nasandin',
            defaults={
                'category': cat, 'title_de': 'Begrussungen & Vorstellung',
                'title_en': 'Greetings & Introductions',
                'description_de': 'Lernen Sie grundlegende Begrussungen und wie Sie sich auf Kurmanci vorstellen.',
                'description_en': 'Learn basic greetings and how to introduce yourself in Kurmanji.',
                'level': 1, 'order': 1, 'audience': 'adult',
            }
        )
        if not created:
            return
        words = [
            ('Silav', 'si-lav', 'Hallo', 'Hello', '👋'),
            ('Roj bas', 'rozh bash', 'Guten Tag', 'Good day', '☀️'),
            ('Sev bas', 'shev bash', 'Gute Nacht', 'Good night', '🌙'),
            ('Tu cawa yi?', 'tu cha-wa yee', 'Wie geht es dir?', 'How are you?', '💬'),
            ('Ez bas im', 'ez bash im', 'Mir geht es gut', 'I am fine', '😊'),
            ('Spas', 'spas', 'Danke', 'Thank you', '🙏'),
            ('Nave min ... e', 'na-ve min ... e', 'Mein Name ist ...', 'My name is ...', '📝'),
            ('Ez ji ... me', 'ez zhi ... me', 'Ich komme aus ...', 'I am from ...', '🌍'),
            ('Kani tu?', 'ka-ni tu', 'Und du?', 'And you?', '🔄'),
            ('Xatire te!', 'kha-ti-re te', 'Auf Wiedersehen!', 'Goodbye!', '👋'),
        ]
        for i, (kmr, pron, de, en, emoji) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, emoji=emoji, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Wie sagt man "Guten Tag" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('Roj bas', True), ('Sev bas', False), ('Silav', False), ('Spas', False)]},
            {'lang': 'en', 'q': 'What does "Tu cawa yi?" mean?',
             'choices': [('How are you?', True), ('What is your name?', False),
                        ('Where are you from?', False), ('Good night', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "Spas"?',
             'choices': [('Danke', True), ('Bitte', False), ('Hallo', False), ('Gut', False)]},
        ])
        self.stdout.write('  ✅ Adult greetings created')

    def _create_adult_grammar_basics(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Rêziman',
            defaults={'name_de': 'Grammatik', 'name_en': 'Grammar',
                      'icon': '✍️', 'order': 11, 'audience': 'adult'}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Cinsiyeta navdêran',
            defaults={
                'category': cat, 'title_de': 'Genus der Substantive',
                'title_en': 'Noun Gender',
                'description_de': 'Im Kurmanci gibt es zwei grammatische Geschlechter: mannlich und weiblich. Lernen Sie die Grundregeln.',
                'description_en': 'Kurmanji has two grammatical genders: masculine and feminine. Learn the basic rules.',
                'level': 2, 'order': 1, 'audience': 'adult',
            }
        )
        if not created:
            return
        words = [
            ('mêr (m)', 'mer', 'Mann (m)', 'man (m)', '👨'),
            ('jin (f)', 'zhin', 'Frau (f)', 'woman (f)', '👩'),
            ('kur (m)', 'kur', 'Junge (m)', 'boy (m)', '👦'),
            ('keç (f)', 'kech', 'Madchen (f)', 'girl (f)', '👧'),
            ('av (f)', 'av', 'Wasser (f)', 'water (f)', '💧'),
            ('nan (m)', 'nan', 'Brot (m)', 'bread (m)', '🍞'),
            ('dar (f)', 'dar', 'Baum (f)', 'tree (f)', '🌳'),
            ('ber (m)', 'ber', 'Stein (m)', 'stone (m)', '🪨'),
        ]
        for i, (kmr, pron, de, en, emoji) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, emoji=emoji, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Welches Geschlecht hat "av" (Wasser) im Kurmanci?',
             'choices': [('Weiblich (f)', True), ('Mannlich (m)', False),
                        ('Sachlich (n)', False), ('Kein Geschlecht', False)]},
            {'lang': 'en', 'q': 'What gender is "nan" (bread) in Kurmanji?',
             'choices': [('Masculine (m)', True), ('Feminine (f)', False),
                        ('Neuter (n)', False), ('No gender', False)]},
        ])
        self.stdout.write('  ✅ Adult grammar basics created')

    def _create_adult_daily_life(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Jiyana rojane',
            defaults={'name_de': 'Alltagsleben', 'name_en': 'Daily Life',
                      'icon': '🏠', 'order': 12, 'audience': 'adult'}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Di bazar de',
            defaults={
                'category': cat, 'title_de': 'Auf dem Markt',
                'title_en': 'At the Market',
                'description_de': 'Nutzliche Satze und Vokabular fur den Einkauf auf dem Markt.',
                'description_en': 'Useful phrases and vocabulary for shopping at the market.',
                'level': 2, 'order': 1, 'audience': 'adult',
            }
        )
        if not created:
            return
        words = [
            ('bazar', 'ba-zar', 'Markt', 'market', '🏪'),
            ('bi cend e?', 'bi chend e', 'Wie viel kostet es?', 'How much is it?', '💰'),
            ('gelek giran e', 'ge-lek gi-ran e', 'Sehr teuer', 'Very expensive', '📈'),
            ('erzan e', 'er-zan e', 'Es ist gunstig', 'It is cheap', '📉'),
            ('ez dixwazim', 'ez di-khwa-zim', 'Ich mochte', 'I would like', '🛒'),
            ('kilo', 'ki-lo', 'Kilogramm', 'kilogram', '⚖️'),
            ('sebze', 'seb-ze', 'Gemuse', 'vegetables', '🥬'),
            ('fêkî', 'fe-kee', 'Obst', 'fruit', '🍎'),
        ]
        for i, (kmr, pron, de, en, emoji) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, emoji=emoji, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Wie fragt man auf Kurmanci "Wie viel kostet es?"', 'choice_lang': 'kmr',
             'choices': [('Bi cend e?', True), ('Kani tu?', False),
                        ('Ez bas im', False), ('Spas', False)]},
            {'lang': 'en', 'q': 'What does "ez dixwazim" mean?',
             'choices': [('I would like', True), ('How much', False),
                        ('Very expensive', False), ('Thank you', False)]},
        ])
        self.stdout.write('  ✅ Adult daily life created')

    def _create_adult_culture(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Çand',
            defaults={'name_de': 'Kultur & Geschichte', 'name_en': 'Culture & History',
                      'icon': '🏛️', 'order': 13, 'audience': 'adult'}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Newroz',
            defaults={
                'category': cat, 'title_de': 'Newroz — Kurdisches Neujahr',
                'title_en': 'Newroz — Kurdish New Year',
                'description_de': 'Erfahren Sie uber Newroz, das wichtigste kurdische Fest, und lernen Sie verwandte Vokabeln.',
                'description_en': 'Learn about Newroz, the most important Kurdish celebration, and related vocabulary.',
                'level': 3, 'order': 1, 'audience': 'adult',
            }
        )
        if not created:
            return
        words = [
            ('Newroz', 'new-roz', 'Neujahr', 'New Year', '🎆'),
            ('agir', 'a-gir', 'Feuer', 'fire', '🔥'),
            ('bihar', 'bi-har', 'Fruhling', 'spring', '🌸'),
            ('govend', 'go-vend', 'Volkstanz', 'folk dance', '💃'),
            ('stran', 'stran', 'Lied', 'song', '🎵'),
            ('azadî', 'a-za-dee', 'Freiheit', 'freedom', '🕊️'),
            ('gel', 'gel', 'Volk', 'people/nation', '👥'),
            ('cejna', 'cej-na', 'Fest', 'celebration', '🎉'),
        ]
        for i, (kmr, pron, de, en, emoji) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, emoji=emoji, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "Newroz"?',
             'choices': [('Neujahr', True), ('Fruhling', False), ('Feuer', False), ('Freiheit', False)]},
            {'lang': 'en', 'q': 'What does "azadi" mean?',
             'choices': [('Freedom', True), ('Fire', False), ('Spring', False), ('People', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Volkstanz" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('govend', True), ('stran', False), ('cejna', False), ('gel', False)]},
        ])
        self.stdout.write('  ✅ Adult culture created')

    def _create_adult_travel(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Rêwîtî',
            defaults={'name_de': 'Reisen', 'name_en': 'Travel',
                      'icon': '✈️', 'order': 14, 'audience': 'adult'}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Di rêwîtiye de',
            defaults={
                'category': cat, 'title_de': 'Unterwegs',
                'title_en': 'On the Road',
                'description_de': 'Wichtige Satze und Worter fur Reisen in kurdischsprachige Regionen.',
                'description_en': 'Important phrases and words for traveling in Kurdish-speaking regions.',
                'level': 2, 'order': 1, 'audience': 'adult',
            }
        )
        if not created:
            return
        words = [
            ('rê', 're', 'Weg/Strasse', 'road/way', '🛤️'),
            ('otêl', 'o-tel', 'Hotel', 'hotel', '🏨'),
            ('balafir', 'ba-la-fir', 'Flugzeug', 'airplane', '✈️'),
            ('trên', 'tren', 'Zug', 'train', '🚂'),
            ('li ku ye?', 'li ku ye', 'Wo ist es?', 'Where is it?', '📍'),
            ('alîkarî', 'a-lee-ka-ree', 'Hilfe', 'help', '🆘'),
            ('nexweşxane', 'nekh-wesh-kha-ne', 'Krankenhaus', 'hospital', '🏥'),
            ('pasaport', 'pa-sa-port', 'Reisepass', 'passport', '🛂'),
        ]
        for i, (kmr, pron, de, en, emoji) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, emoji=emoji, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Wie fragt man auf Kurmanci "Wo ist es?"', 'choice_lang': 'kmr',
             'choices': [('Li ku ye?', True), ('Bi cend e?', False),
                        ('Tu cawa yi?', False), ('Kani tu?', False)]},
            {'lang': 'en', 'q': 'What does "alikari" mean?',
             'choices': [('Help', True), ('Hospital', False), ('Hotel', False), ('Road', False)]},
        ])
        self.stdout.write('  ✅ Adult travel created')

    def _create_adult_work(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Kar û pîşe',
            defaults={'name_de': 'Arbeit & Beruf', 'name_en': 'Work & Profession',
                      'icon': '💼', 'order': 15, 'audience': 'adult'}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Di kar de',
            defaults={
                'category': cat, 'title_de': 'Bei der Arbeit',
                'title_en': 'At Work',
                'description_de': 'Berufsbezogene Worter und Ausdrucke auf Kurmanci.',
                'description_en': 'Work-related words and expressions in Kurmanji.',
                'level': 3, 'order': 1, 'audience': 'adult',
            }
        )
        if not created:
            return
        words = [
            ('kar', 'kar', 'Arbeit', 'work', '💼'),
            ('mamosta', 'ma-mos-ta', 'Lehrer/in', 'teacher', '👩‍🏫'),
            ('doktor', 'dok-tor', 'Arzt/Arztin', 'doctor', '👨‍⚕️'),
            ('muhendes', 'mu-hen-des', 'Ingenieur/in', 'engineer', '👷'),
            ('parêzer', 'pa-re-zer', 'Anwalt/Anwaltin', 'lawyer', '⚖️'),
            ('cotkar', 'chot-kar', 'Bauer/Bauerin', 'farmer', '👨‍🌾'),
            ('meaş', 'me-ash', 'Gehalt', 'salary', '💰'),
            ('ofîs', 'o-fees', 'Buro', 'office', '🏢'),
        ]
        for i, (kmr, pron, de, en, emoji) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, emoji=emoji, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Wie sagt man "Lehrer" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('mamosta', True), ('doktor', False), ('parêzer', False), ('cotkar', False)]},
            {'lang': 'en', 'q': 'What does "cotkar" mean?',
             'choices': [('Farmer', True), ('Engineer', False), ('Lawyer', False), ('Teacher', False)]},
        ])
        self.stdout.write('  ✅ Adult work created')
