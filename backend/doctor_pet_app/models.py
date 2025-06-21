from django.contrib.auth.models import User;
from django.db import models;
from datetime import datetime, timedelta;

class Task(models.Model):
    # Serviço
    ### Modelo de Serviço ### 
    ## Propriedades 
    ## * Titulo
    ## * Tipo
    ## * Especialidade
    ## * Tempo de Execução
    ## * éDomicilio?

    title = models.CharField(
        verbose_name='Titulo do Serviço',
        max_length=256,
    )
    slug = models.SlugField(
        verbose_name='Tipo (slug)',
        default="no-name"
    )
    specialty = models.CharField(
        verbose_name='Especialidade',
        max_length=124, 
        null=True
    )
    estimated_time = models.TimeField(
        verbose_name='Tempo de Execução',
    )
    is_it_home = models.BooleanField(
        verbose_name='É à Domicilio?',
    ) 

    def __str__(self):
        return self.title

class Attendance(models.Model): 
    # Atendimento
    ### Modelo de Atendimento ### 
    ## Propriedades
    ## * Serviço 
    ## * Médico
    ## * Cliente
    ## * Horário
    ##  * Tempo de Execução
    ##  * Horário de Inicio    
    ##  * Horário de Término    
    task = models.ForeignKey(
        to=Task, 
        verbose_name="Serviço",
        on_delete=models.CASCADE,
    )
    worker_responsible = models.ForeignKey(
        verbose_name='Colaborador',
        to=User,
        on_delete=models.CASCADE, 
        related_name='attendance_worker'    
    )
    client_requester = models.ForeignKey(
        verbose_name='Cliente',
        to=User,
        on_delete=models.CASCADE,
        related_name='attendance_client'
    )
    time_span = models.TimeField(
        verbose_name='Tempo Estimado'
    )
    start_time = models.DateTimeField(
        verbose_name='Horário de Início do Serviço'
    )
    end_time = models.DateTimeField(
        verbose_name='Horário de Término do Serviço'
    )

    @property
    def estimated_end_time(self) -> datetime:
        return datetime.combine(date=self.start_time, time=self.time_span)

    def is_ongoing(self, when: datetime = None) -> bool:
        now = when or datetime.now();
        return self.start_time <= now <= self.end_time
    
    def was_finished(self, when: datetime = None) -> bool:
        now = when or datetime.now();
        return self.estimated_end_time <= now or self.end_time <= now

    def was_complete_recently(self) -> bool: 
        return self.estimated_end_time > timedelta(days=1)
        # return self.start_time.combine(date=self.start_date, time=self.time_span) > datetime.timedelta(days=1)

    def __str__(self) -> str:
        return self.task + ' - ' + self.worker_responsible
