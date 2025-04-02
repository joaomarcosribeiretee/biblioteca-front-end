from enum import Enum, auto

class EstadoLeitura(Enum):
    TERMINOU = auto()
    LENDO = auto()
    NAO_INICIADA = auto()

class EstadoReleitura(Enum):
    RELEITURA_INICIADA = auto()
    RELEITURA_FINALIZADA = auto()
    RELEITURA_NAO_INICIADA = auto()

class EstadoMeta(Enum):
    META_CUMPRIDA = auto()
    META_EM_ANDAMENTO = auto()
    META_ABANDONADA = auto()
    META_DEFAULT = auto()
    META_FALHADA = auto()
    
class EstadoEmprestimo(Enum):
    ATRASADO = auto()
    CONCLUIDO = auto()
    EM_ANDAMENTO = auto()
    NAO_EMPRESTADO = auto()

class EstadoAvaliacao(Enum):
    BOM = auto()
    MEDIANO = auto()
    RUIM = auto()
    NAO_AVALIADO = auto()

class EstadoListaDeDesejos():
    ADQURIDO = auto()
    NAO_ADQUIRIDO = auto()

class EstadoInterrompido():
    ABANDONO = auto()
    PAUSADO = auto()
    NAO_INTERROMPIDO = auto()

class EstadoLeituraDiaria():
    LEITURA_CUMPRIDA = auto()
    LEITURA_NAO_CUMPRIDA = auto()
    LEITURA_DEFAULT = auto()


class Gestao_leitura():
    def __init__(self, num_paginas_total):
        #Variavel 1
        self.num_paginas_total = num_paginas_total
        self.estado = EstadoLeitura.NAO_INICIADA

    def leitura_iniciada(self, num_paginas_lidas) -> bool:
        if num_paginas_lidas > 0 and num_paginas_lidas < self.num_paginas_total and self.estado == EstadoLeitura.NAO_INICIADA:
            return True
        else:
            return False

    def leitura_finalizada(self, num_paginas_lidas):
        if num_paginas_lidas == self.num_paginas_total and self.estado == EstadoLeitura.LENDO:
            return True
        else:
            return False
    
    def ciclo_leitura(self, num_paginas_lidas):
        if self.leitura_iniciada(self,num_paginas_lidas):
            self.estado = EstadoLeitura.LENDO
        elif self.leitura_finalizada(self,num_paginas_lidas):
            self.estado = EstadoLeitura.TERMINOU


class Gestao_metas():
    def __init__(self, data_inicio, data_meta):
        #Variavel 2
        self.data_inicio = data_inicio
        #Variavel 3
        self.data_meta = data_meta
        self.estado = EstadoMeta.META_DEFAULT
    
    def verificacao_meta(self, data_terminou_leitura, data_atual):
        if data_terminou_leitura == self.data_meta:
            self.estado = EstadoMeta.META_CUMPRIDA
        elif data_terminou_leitura > self.data_meta:
            self.estado = EstadoMeta.META_FALHADA
        elif data_terminou_leitura == None and self.data_inicio != None and data_atual < self.data_meta:
            self.estado = EstadoMeta.META_EM_ANDAMENTO

    def abandonar_meta(self, abandona_meta):
        if abandona_meta == True:
            self.estado = EstadoMeta.META_ABANDONADA


class Gestao_leituras_interrompidas():
    def __init__(self):
        #Variavel 4
        self.estado = EstadoInterrompido.NAO_INTERROMPIDO
    
    def pausar_leitura(self):
        if not self.estado == EstadoInterrompido.ABANDONO:
            self.estado = EstadoInterrompido.PAUSADO

    def abandonar_leitura(self):
        if not self.estado == EstadoInterrompido.PAUSADO:
            self.estado = EstadoInterrompido.ABANDONO


class Gestao_leitura_diaria():
    #tempo ou paginas
    def __init__(self, meta_paginas, paginas_livro):
        # Variavel 5
        self.meta_paginas = meta_paginas
        self.paginas_livros = paginas_livro
        self.estado = EstadoLeituraDiaria.LEITURA_DEFAULT
    
    def avaliacao_leitura_diaria(self, paginas_lidas):
        if self.estado == EstadoLeituraDiaria.LEITURA_DEFAULT and paginas_lidas >= self.meta_paginas: 
            self.estado = EstadoLeituraDiaria.LEITURA_CUMPRIDA
        elif paginas_lidas < self.meta_paginas:
            self.estado = EstadoLeituraDiaria.LEITURA_NAO_CUMPRIDA
        elif self.paginas_livros < paginas_lidas:
            raise Exception("Páginas lidas maior que o número de páginas do livro")


class Gestao_emprestimos():
    def __init__(self, data_prevista):
        #Variavel 6
        self.estado = EstadoEmprestimo.NAO_EMPRESTADO
        self.data_prevista = data_prevista

    def Emprestar(self):
        if self.estado != EstadoEmprestimo.NAO_EMPRESTADO:
            raise Exception(f"Não se pode emprestar no estado{self._estado}")
        else:
            self.estado = EstadoEmprestimo.EM_ANDAMENTO
    
    def Devolucao(self, data_atual, data_prevista):
        if self.estado != EstadoEmprestimo.EM_ANDAMENTO:
            raise Exception(f"Não se pode receber a devolução no estado{self._estado}")
        elif data_atual <= data_prevista:
            self.estado = EstadoEmprestimo.CONCLUIDO
        elif data_atual > data_prevista:
            self.estado = EstadoEmprestimo.ATRASADO


class Gestao_reeleituras():
    def __init__(self, num_paginas_total):
        #Variavel 7
        self.estado = EstadoReleitura.RELEITURA_NAO_INICIADA
        self.num_paginas_total = num_paginas_total

    def releitura_iniciada(self, num_paginas_lidas) -> bool:
        if num_paginas_lidas > 0 and num_paginas_lidas < self.num_paginas_total and self.estado == EstadoReleitura.RELEITURA_NAO_INICIADA:
            return True
        else:
            return False

    def leitura_finalizada(self, num_paginas_lidas):
        if num_paginas_lidas == self.num_paginas_total and self.estado == EstadoReleitura.RELEITURA_INICIADA:
            return True
        else:
            return False
    
    def ciclo_leitura(self, num_paginas_lidas):
        if self.leitura_iniciada(self,num_paginas_lidas):
            self.estado = EstadoReleitura.RELEITURA_INICIADA
        elif self.leitura_finalizada(self,num_paginas_lidas):
            self.estado = EstadoReleitura.RELEITURA_FINALIZADA


class Gestao_lista_desejadas():
    def __init__(self):
        self.estado = EstadoListaDeDesejos.NAO_ADQUIRIDO

    def adquirir(self):
        if self.estado == EstadoListaDeDesejos.NAO_ADQUIRIDO:
            self.estado = EstadoListaDeDesejos.ADQURIDO
        else:
            raise Exception("O livro já foi adquirido")

class Gestao_avaliacao():
    def __init__(self, nota):
        self.estado = EstadoAvaliacao.NAO_AVALIADO
        self.nota = nota

    def avaliacao(self):
        if self.nota <= 5:
            self.estado = EstadoAvaliacao.RUIM
        elif self.nota > 5 and self.nota <= 7:
            self.estado = EstadoAvaliacao.MEDIANO
        else:
            self.nota = EstadoAvaliacao.BOM