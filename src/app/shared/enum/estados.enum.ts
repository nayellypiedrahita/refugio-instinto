export enum Estados {
    Critico = 'critico',
    Urgente = 'urgente',
    Leve = 'leve',
    Disponible = 'disponible',
    Adoptado = 'adoptado',
    NoDisponible = 'no disponible',
}

export const EstadosBajoCuidado: string[] = [Estados.Critico, Estados.Leve, Estados.Urgente];
export const EstadosTodos: string[] = [Estados.Critico, Estados.Leve, Estados.Urgente, Estados.Adoptado, Estados.Disponible, Estados.NoDisponible];
export const EstadosAdopciones: string[] = [Estados.Adoptado, Estados.Disponible];